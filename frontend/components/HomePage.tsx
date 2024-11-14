'use client'

import { useState } from 'react'
import Navbar from "./Navbar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from 'lucide-react'

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  company: string
  jobTitle: string
}

// Mock data for contacts
const initialContacts: Contact[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '123-456-7890', company: 'Acme Inc.', jobTitle: 'Developer' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '098-765-4321', company: 'Tech Co.', jobTitle: 'Designer' },
]

export default function HomePage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleSave = (updatedContact: Contact) => {
    setContacts(contacts.map(contact => 
      contact.id === updatedContact.id ? updatedContact : contact
    ))
    setEditingContact(null)
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
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
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
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
    <form onSubmit={handleSubmit} className="space-y-4">
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