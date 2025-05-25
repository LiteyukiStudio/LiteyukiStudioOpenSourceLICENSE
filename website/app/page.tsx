"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Github, FileText, Users, Shield, Code, Heart, Star, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LicenseSelector } from "@/components/license-selector"
import { LanguageSelector } from "@/components/language-selector"
import { translations } from "@/lib/translations"
import Link from "next/link"

export default function LicensePage() {
  const { theme } = useTheme()
  const [currentLicense, setCurrentLicense] = useState("lso-common")
  const [currentVersion, setCurrentVersion] = useState("1.3")
  const [language, setLanguage] = useState("en")
  const [currentYear, setCurrentYear] = useState("")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())

    // Auto-detect language from browser
    const browserLang = navigator.language.split("-")[0]
    if (browserLang === "zh") {
      setLanguage("zh")
    }
  }, [])

  const t = translations[language as keyof typeof translations]

  const handleLicenseChange = (license: string, version: string) => {
    setCurrentLicense(license)
    setCurrentVersion(version)
  }

  const getDownloadUrl = () => {
    const langSuffix = language === "zh" ? "cn" : "en"
    return `https://cdn.liteyuki.org/lso/lsov${currentVersion}/LSO-Common-${langSuffix}.license`
  }

  return (
    <div className={`min-h-screen ${theme === "night" ? "gradient-bg-night" : "gradient-bg"}`}>
      {/* Header */}
      <header className="border-b border-sky-100 dark:border-sky-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Liteyuki Studio</h1>
                <p className="text-sm text-sky-600 dark:text-sky-400">Opensource License</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <LicenseSelector
                currentLicense={currentLicense}
                currentVersion={currentVersion}
                onLicenseChange={handleLicenseChange}
                t={t}
              />
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
              <ThemeToggle />
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  {t.adminPanel}
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-300">
            LSO License v{currentVersion}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-600 via-purple-600 to-sky-800 bg-clip-text text-transparent">
            Liteyuki Studio
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700"
              onClick={() => window.open(getDownloadUrl(), "_blank")}
            >
              <Download className="w-5 h-5 mr-2" />
              {t.downloadLicense}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-sky-300 text-sky-700 hover:bg-sky-50 dark:border-sky-600 dark:text-sky-300 dark:hover:bg-sky-900"
            >
              <FileText className="w-5 h-5 mr-2" />
              {t.readFullText}
            </Button>
          </div>
        </div>
      </section>

      {/* License Overview */}
      <section id="license" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.licenseOverview}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The Liteyuki Studio Opensource License (LSO) is designed to be simple, clear, and developer-friendly.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-sky-200 dark:border-sky-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/50 dark:to-purple-900/50">
              <CardTitle className="text-2xl text-gray-900 dark:text-white">LSO License Terms</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Key provisions and permissions under this license
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="bg-sky-50 dark:bg-sky-900/30 border-l-4 border-sky-400 p-6 mb-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-sky-800 dark:text-sky-300 mb-2">{t.permissions}</h3>
                  <ul className="text-sky-700 dark:text-sky-400 space-y-1">
                    <li>✓ {t.commercialUse}</li>
                    <li>✓ {t.modification}</li>
                    <li>✓ {t.distribution}</li>
                    <li>✓ {t.privateUse}</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-400 p-6 mb-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">{t.conditions}</h3>
                  <ul className="text-purple-700 dark:text-purple-400 space-y-1">
                    <li>• {t.includeCopyright}</li>
                    <li>• {t.includeLicense}</li>
                    <li>• {t.stateChanges}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 border-l-4 border-gray-400 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">{t.limitations}</h3>
                  <ul className="text-gray-700 dark:text-gray-400 space-y-1">
                    <li>× {t.noLiability}</li>
                    <li>× {t.noWarranty}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-4 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.whyChoose}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Designed with modern development practices and community collaboration in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-sky-200 dark:border-sky-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-sky-800 dark:text-sky-300">{t.developerFriendly}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Clear, concise terms that developers can easily understand and implement without legal complexity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-purple-800 dark:text-purple-300">{t.communityFocused}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Encourages collaboration and contribution while respecting the original creator's rights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sky-200 dark:border-sky-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-800 dark:text-gray-300">{t.innovationDriven}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Promotes innovation and creativity while maintaining attribution and transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-900 to-purple-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <span className="font-bold">Liteyuki Studio</span>
              </div>
              <p className="text-sky-100 mb-4">
                Building the future of open source licensing with developer-friendly terms.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => window.open("https://github.com/liteyuki-studio", "_blank")}
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t.resources}</h3>
              <ul className="space-y-2 text-sky-100">
                <li>
                  <a href="https://liteyuki.org/docs" className="hover:text-white transition-colors">
                    {t.documentation}
                  </a>
                </li>
                <li>
                  <a href="https://liteyuki.org/faq" className="hover:text-white transition-colors">
                    {t.faq}
                  </a>
                </li>
                <li>
                  <a href="https://liteyuki.org/examples" className="hover:text-white transition-colors">
                    {t.examples}
                  </a>
                </li>
                <li>
                  <a href="https://liteyuki.org/community" className="hover:text-white transition-colors">
                    {t.community}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t.contact}</h3>
              <ul className="space-y-2 text-sky-100">
                <li>Email: contact@liteyuki.org</li>
                <li>GitHub: @liteyuki-studio</li>
                <li>Website: liteyuki.org</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-white/20" />

          <div className="text-center text-sky-100">
            <p>&copy; {currentYear} Liteyuki Studio. Licensed under LSO License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
