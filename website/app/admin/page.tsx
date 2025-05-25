"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Save, Plus, Trash2, Download, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface License {
  id: string
  name: string
  description: string
  versions: string[]
  content: string
}

export default function AdminPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState<string>("")

  useEffect(() => {
    loadLicenses()
    setLastSync(new Date().toLocaleString())
  }, [])

  const loadLicenses = async () => {
    setIsLoading(true)
    try {
      // Simulate loading from CDN/API
      const mockLicenses: License[] = [
        {
          id: "lso-common",
          name: "LSO Common",
          description: "Liteyuki Studio Opensource Common License",
          versions: ["1.3", "1.2", "1.1", "1.0"],
          content: "License content here...",
        },
        {
          id: "lso-commercial",
          name: "LSO Commercial",
          description: "Liteyuki Studio Commercial License",
          versions: ["2.1", "2.0"],
          content: "Commercial license content...",
        },
      ]
      setLicenses(mockLicenses)
    } catch (error) {
      console.error("Failed to load licenses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncFromCDN = async () => {
    setIsLoading(true)
    try {
      // Simulate CDN sync
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await loadLicenses()
      setLastSync(new Date().toLocaleString())
    } catch (error) {
      console.error("CDN sync failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveLicense = async (license: License) => {
    try {
      // Simulate save to CDN
      console.log("Saving license:", license)
      // Update local state
      setLicenses((prev) => prev.map((l) => (l.id === license.id ? license : l)))
    } catch (error) {
      console.error("Failed to save license:", error)
    }
  }

  const addNewLicense = () => {
    const newLicense: License = {
      id: `lso-new-${Date.now()}`,
      name: "New License",
      description: "Description",
      versions: ["1.0"],
      content: "",
    }
    setLicenses((prev) => [...prev, newLicense])
    setSelectedLicense(newLicense)
  }

  const deleteLicense = (licenseId: string) => {
    setLicenses((prev) => prev.filter((l) => l.id !== licenseId))
    if (selectedLicense?.id === licenseId) {
      setSelectedLicense(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to License
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">License Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Last sync: {lastSync}</Badge>
              <Button onClick={syncFromCDN} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Sync from CDN
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* License List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Licenses</CardTitle>
                  <Button size="sm" onClick={addNewLicense}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {licenses.map((license) => (
                  <div
                    key={license.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedLicense?.id === license.id
                        ? "bg-sky-50 border-sky-200 dark:bg-sky-900/20 dark:border-sky-700"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedLicense(license)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{license.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{license.description}</p>
                        <div className="flex gap-1 mt-1">
                          {license.versions.slice(0, 3).map((version) => (
                            <Badge key={version} variant="secondary" className="text-xs">
                              v{version}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteLicense(license.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* License Editor */}
          <div className="lg:col-span-2">
            {selectedLicense ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit License: {selectedLicense.name}</CardTitle>
                  <CardDescription>Modify license details and content. Changes will be synced to CDN.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">License Name</Label>
                      <Input
                        id="name"
                        value={selectedLicense.name}
                        onChange={(e) =>
                          setSelectedLicense({
                            ...selectedLicense,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="id">License ID</Label>
                      <Input
                        id="id"
                        value={selectedLicense.id}
                        onChange={(e) =>
                          setSelectedLicense({
                            ...selectedLicense,
                            id: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={selectedLicense.description}
                      onChange={(e) =>
                        setSelectedLicense({
                          ...selectedLicense,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="versions">Versions (comma-separated)</Label>
                    <Input
                      id="versions"
                      value={selectedLicense.versions.join(", ")}
                      onChange={(e) =>
                        setSelectedLicense({
                          ...selectedLicense,
                          versions: e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">License Content</Label>
                    <Textarea
                      id="content"
                      rows={10}
                      value={selectedLicense.content}
                      onChange={(e) =>
                        setSelectedLicense({
                          ...selectedLicense,
                          content: e.target.value,
                        })
                      }
                      placeholder="Enter the full license text here..."
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Import
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                    <Button onClick={() => saveLicense(selectedLicense)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No License Selected</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a license from the list to edit, or create a new one.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
