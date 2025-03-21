
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Plus, Save, Trash2, Check, X, MoveVertical, FileCode, ClipboardList, PenLine } from 'lucide-react';

type FieldType = 'text' | 'textarea' | 'checkbox' | 'select' | 'date' | 'number' | 'email' | 'tel';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select fields
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
}

const FormCreator: React.FC = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>([
    {
      id: 'form-001',
      name: 'Client Intake Form',
      description: 'Basic information collection for new clients',
      category: 'Intake',
      fields: [
        { id: 'f1', type: 'text', label: 'Full Name', placeholder: 'Enter full name', required: true },
        { id: 'f2', type: 'email', label: 'Email', placeholder: 'Enter email address', required: true },
        { id: 'f3', type: 'tel', label: 'Phone Number', placeholder: '(XXX) XXX-XXXX', required: false },
        { id: 'f4', type: 'date', label: 'Date of Birth', required: true },
        { id: 'f5', type: 'textarea', label: 'Additional Notes', placeholder: 'Enter any additional information', required: false }
      ]
    },
    {
      id: 'form-002',
      name: 'Home Visit Report',
      description: 'Documentation form for home visits',
      category: 'Reports',
      fields: [
        { id: 'f1', type: 'date', label: 'Visit Date', required: true },
        { id: 'f2', type: 'text', label: 'Client Name', placeholder: 'Enter client name', required: true },
        { id: 'f3', type: 'text', label: 'Address', placeholder: 'Enter address', required: true },
        { id: 'f4', type: 'textarea', label: 'Observations', placeholder: 'Describe your observations', required: true },
        { id: 'f5', type: 'textarea', label: 'Follow-up Actions', placeholder: 'List required follow-up actions', required: false },
        { id: 'f6', type: 'checkbox', label: 'Requires Immediate Action', required: false }
      ]
    }
  ]);

  const [activeForm, setActiveForm] = useState<FormTemplate | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [currentField, setCurrentField] = useState<FormField | null>(null);

  const handleCreateNewForm = () => {
    const newForm: FormTemplate = {
      id: `form-${Date.now()}`,
      name: 'Untitled Form',
      description: 'Form description',
      category: 'General',
      fields: []
    };
    setTemplates([...templates, newForm]);
    setActiveForm(newForm);
    setEditMode(true);
  };

  const handleAddField = (type: FieldType) => {
    if (!activeForm) return;
    
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      placeholder: type === 'textarea' || type === 'text' ? 'Enter value' : undefined,
      required: false
    };
    
    const updatedForm = {
      ...activeForm,
      fields: [...activeForm.fields, newField]
    };
    
    setActiveForm(updatedForm);
    setTemplates(templates.map(t => t.id === activeForm.id ? updatedForm : t));
    setCurrentField(newField);
  };

  const handleSaveForm = () => {
    if (!activeForm) return;
    
    // Update the form in the templates array
    setTemplates(templates.map(t => t.id === activeForm.id ? activeForm : t));
    setEditMode(false);
  };

  const renderFieldEditor = () => {
    if (!currentField) return null;
    
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Edit Field</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fieldLabel">Label</Label>
            <Input 
              id="fieldLabel" 
              value={currentField.label} 
              onChange={(e) => {
                if (!activeForm) return;
                const updatedField = { ...currentField, label: e.target.value };
                const updatedFields = activeForm.fields.map(f => 
                  f.id === currentField.id ? updatedField : f
                );
                setActiveForm({ ...activeForm, fields: updatedFields });
                setCurrentField(updatedField);
              }}
            />
          </div>
          
          {(currentField.type === 'text' || currentField.type === 'textarea') && (
            <div className="grid gap-2">
              <Label htmlFor="fieldPlaceholder">Placeholder</Label>
              <Input 
                id="fieldPlaceholder" 
                value={currentField.placeholder || ''} 
                onChange={(e) => {
                  if (!activeForm) return;
                  const updatedField = { ...currentField, placeholder: e.target.value };
                  const updatedFields = activeForm.fields.map(f => 
                    f.id === currentField.id ? updatedField : f
                  );
                  setActiveForm({ ...activeForm, fields: updatedFields });
                  setCurrentField(updatedField);
                }}
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fieldRequired" 
              checked={currentField.required}
              onCheckedChange={(checked) => {
                if (!activeForm) return;
                const updatedField = { ...currentField, required: !!checked };
                const updatedFields = activeForm.fields.map(f => 
                  f.id === currentField.id ? updatedField : f
                );
                setActiveForm({ ...activeForm, fields: updatedFields });
                setCurrentField(updatedField);
              }}
            />
            <Label htmlFor="fieldRequired">Required field</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="destructive"
            onClick={() => {
              if (!activeForm) return;
              const updatedFields = activeForm.fields.filter(f => f.id !== currentField.id);
              setActiveForm({ ...activeForm, fields: updatedFields });
              setCurrentField(null);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Field
          </Button>
          <Button 
            variant="outline"
            onClick={() => setCurrentField(null)}
          >
            Done
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderFormPreview = () => {
    if (!activeForm) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{editMode ? 'Form Builder' : 'Form Preview'}</h2>
          <div className="space-x-2">
            {editMode ? (
              <>
                <Button onClick={handleSaveForm}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Form
                </Button>
                <Button variant="outline" onClick={() => {
                  // Reset to the original form
                  const originalForm = templates.find(t => t.id === activeForm.id) || null;
                  setActiveForm(originalForm);
                  setEditMode(false);
                  setCurrentField(null);
                }}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                <PenLine className="h-4 w-4 mr-2" />
                Edit Form
              </Button>
            )}
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{activeForm.name}</CardTitle>
            <CardDescription>{activeForm.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeForm.fields.map((field) => (
              <div 
                key={field.id} 
                className={`space-y-2 p-3 rounded ${editMode ? 'border cursor-pointer hover:bg-accent' : ''}`}
                onClick={() => {
                  if (editMode) {
                    setCurrentField(field);
                  }
                }}
              >
                <div className="flex justify-between">
                  <Label htmlFor={field.id} className="flex items-center">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {editMode && (
                    <MoveVertical className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                
                {field.type === 'text' && (
                  <Input id={field.id} placeholder={field.placeholder} disabled={!editMode} />
                )}
                {field.type === 'textarea' && (
                  <Textarea id={field.id} placeholder={field.placeholder} disabled={!editMode} />
                )}
                {field.type === 'checkbox' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox id={field.id} disabled={!editMode} />
                    <Label htmlFor={field.id}>{field.placeholder || 'Yes'}</Label>
                  </div>
                )}
                {field.type === 'date' && (
                  <Input id={field.id} type="date" disabled={!editMode} />
                )}
                {field.type === 'email' && (
                  <Input id={field.id} type="email" placeholder={field.placeholder} disabled={!editMode} />
                )}
                {field.type === 'tel' && (
                  <Input id={field.id} type="tel" placeholder={field.placeholder} disabled={!editMode} />
                )}
                {field.type === 'number' && (
                  <Input id={field.id} type="number" placeholder={field.placeholder} disabled={!editMode} />
                )}
              </div>
            ))}
            
            {editMode && activeForm.fields.length === 0 && (
              <div className="text-center p-8 border border-dashed rounded">
                <p className="text-muted-foreground">No fields added yet. Use the tools below to add form fields.</p>
              </div>
            )}
            
            {editMode && (
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Add form elements</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button variant="outline" onClick={() => handleAddField('text')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button variant="outline" onClick={() => handleAddField('textarea')}>
                    <FileCode className="h-4 w-4 mr-2" />
                    Textarea
                  </Button>
                  <Button variant="outline" onClick={() => handleAddField('checkbox')}>
                    <Check className="h-4 w-4 mr-2" />
                    Checkbox
                  </Button>
                  <Button variant="outline" onClick={() => handleAddField('date')}>
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Date
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          {!editMode && (
            <CardFooter>
              <Button className="w-full">Submit Form</Button>
            </CardFooter>
          )}
        </Card>
        
        {editMode && renderFieldEditor()}
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Creator</h1>
          <p className="text-muted-foreground mt-1">Create and manage custom forms for data collection</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Form Templates</CardTitle>
                <CardDescription>Select an existing form or create a new one</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={handleCreateNewForm}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Form
                </Button>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium">Your Forms</p>
                  <div className="space-y-1">
                    {templates.map(template => (
                      <Button
                        key={template.id}
                        variant={activeForm?.id === template.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          setActiveForm(template);
                          setEditMode(false);
                          setCurrentField(null);
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {template.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full sm:w-2/3">
            {activeForm ? (
              renderFormPreview()
            ) : (
              <div className="flex items-center justify-center h-48 border rounded-lg">
                <div className="text-center">
                  <h2 className="text-xl font-medium mb-2">No Form Selected</h2>
                  <p className="text-muted-foreground mb-4">Select or create a form to get started</p>
                  <Button onClick={handleCreateNewForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Form
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormCreator;
