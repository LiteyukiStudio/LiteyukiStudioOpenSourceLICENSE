"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, FileText } from "lucide-react"

interface License {
  id: string
  name: string
  description: string
  versions: string[]
}

interface LicenseSelectorProps {
  currentLicense: string
  currentVersion: string
  onLicenseChange: (license: string, version: string) => void
  t: any
}

export function LicenseSelector({ currentLicense, currentVersion, onLicenseChange, t }: LicenseSelectorProps) {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLicenses()
  }, [])

  const fetchLicenses = async () => {
    try {
      // Simulate CDN fetch - in real implementation, this would fetch from your CDN
      const response = await fetch("/api/licenses")
      if (response.ok) {
        const data = await response.json()
        setLicenses(data)
      } else {
        // Fallback data
        setLicenses([
          {
            id: "lso-common",
            name: "LSO Common",
            description: "Liteyuki Studio Opensource Common License",
            versions: ["1.3", "1.2", "1.1", "1.0"],
          },
          {
            id: "lso-commercial",
            name: "LSO Commercial",
            description: "Liteyuki Studio Commercial License",
            versions: ["2.1", "2.0"],
          },
          {
            id: "lso-academic",
            name: "LSO Academic",
            description: "Liteyuki Studio Academic License",
            versions: ["1.0"],
          },
        ])
      }
    } catch (error) {
      console.error("Failed to fetch licenses:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentLicenseData = licenses.find((l) => l.id === currentLicense)

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-[200px]">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              {currentLicenseData?.name || t.selectLicense}
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          {licenses.map((license) => (
            <DropdownMenuItem
              key={license.id}
              onClick={() => onLicenseChange(license.id, license.versions[0])}
              className="flex flex-col items-start p-3"
            >
              <div className="font-medium">{license.name}</div>
              <div className="text-sm text-muted-foreground">{license.description}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {currentLicenseData && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="justify-between min-w-[120px]">
              v{currentVersion}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {currentLicenseData.versions.map((version) => (
              <DropdownMenuItem key={version} onClick={() => onLicenseChange(currentLicense, version)}>
                v{version}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
