'use client'

import { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, ChevronUp, ChevronDown} from 'lucide-react'
import { useSearchParams } from 'next/navigation';

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  company: string
  jobTitle: string
}

const initialContacts: Contact[] = []

type SortKey = keyof Contact
type SortOrder = 'asc' | 'desc'

export default function HomePage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const [searchParams] = useSearchParams();
  const username = searchParams[1];

  const fetchContacts = async () => {
    const response = await fetch(`http://localhost:8080/contacts?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    const initialContacts: Contact[] = []


    for (const current of data.contacts) {
      let contact : Contact= {
        id: current.id,
        firstName: current.FirstName,
        lastName: current.LastName,
        email: current.Email,
        phoneNumber: current.Phone_Number,
        company: current.Company,
        jobTitle: current.Job_Title
      }
      
      initialContacts.push(contact)
    }
    setContacts(initialContacts)
  }

  useEffect(() => {
    fetchContacts()
  }, [])


  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setContacts(contacts.filter(contact => contact?.id !== id))
    } catch (error) {
      setError("" + error)
    }
  }

  const handleSave = async (updatedContact: Contact) => {
    try {
      let response = await fetch(`http://localhost:8080/contacts/${updatedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      })

      setEditingContact(null)
      setIsDialogOpen(false)

      if (response.ok) {

        const data = await response.json()

        if (data.contact == "Validation error") {
          throw data.users
        }

        setContacts(contacts.map(contact => 
          contact.id === updatedContact.id ? updatedContact : contact
        ))
        setError('')
      } else {
        const errorData = await response.json()
        throw errorData.error
      }

    } catch (error) {
      setError("there is a contact that exist with the same email or phone number")
    }
  }

  const handleSort = (key: SortKey) => {
    setSortOrder(currentOrder => 
      sortKey === key && currentOrder === 'asc' ? 'desc' : 'asc'
    )
    setSortKey(key)
  }

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null
    return sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 inline" /> : <ChevronDown className="h-4 w-4 inline" />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar username={username}/>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        {contacts && contacts.length === 0 && <p>No contacts found</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {contacts && contacts.length > 0 && 
          <Table>
          <TableHeader>
              <TableRow>
                {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((key) => (
                  <TableHead key={key} onClick={() => handleSort(key as SortKey)} className="cursor-pointer">
                    {key.charAt(0).toUpperCase() + key.slice(1)} <SortIcon columnKey={key as SortKey} />
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.firstName}</TableCell>
                  <TableCell>{contact.lastName}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phoneNumber}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.jobTitle}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(contact)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(contact.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        }
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen }>
        <DialogContent aria-label="Contact Form" aria-describedby="contact-form">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          {editingContact && (
            <EditForm contact={editingContact} onSave={handleSave} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface EditFormProps {
  contact: Contact
  onSave: (updatedContact: Contact) => void
}

function EditForm({ contact, onSave }: EditFormProps) {
  const [editedContact, setEditedContact] = useState(contact)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedContact(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedContact)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4"  id='contact-form'>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" name="firstName" value={editedContact.firstName} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" name="lastName" value={editedContact.lastName} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={editedContact.email} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" name="phoneNumber" value={editedContact.phoneNumber} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" value={editedContact.company} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input id="jobTitle" name="jobTitle" value={editedContact.jobTitle} onChange={handleChange} />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}