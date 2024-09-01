'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
// Remove the unused import statement for Button
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

// List of available icons (you would need to fetch this from Skill Icons or maintain your own list)
const availableIcons = [
  "ableton", "activitypub", "actix", "adonis", "ae", "aiscript", "alpinejs", "anaconda", "androidstudio", "angular",
  "ansible", "apollo", "apple", "appwrite", "arch", "arduino", "astro", "atom", "au", "autocad",
  "aws", "azul", "azure", "babel", "bash", "bevy", "bitbucket", "blender", "bootstrap", "bsd",
  "bun", "c", "cs", "cpp", "crystal", "cassandra", "clion", "clojure", "cloudflare", "cmake",
  "codepen", "coffeescript", "css", "cypress", "d3", "dart", "debian", "deno", "devto", "discord",
  "bots", "discordjs", "django", "docker", "dotnet", "dynamodb", "eclipse", "elasticsearch", "electron", "elixir",
  "elysia", "emacs", "ember", "emotion", "express", "fastapi", "fediverse", "figma", "firebase", "flask",
  "flutter", "forth", "fortran", "gamemakerstudio", "gatsby", "gcp", "git", "github", "githubactions", "gitlab",
  "gmail", "gherkin", "go", "gradle", "godot", "grafana", "graphql", "gtk", "gulp", "haskell",
  "haxe", "haxeflixel", "heroku", "hibernate", "html", "htmx", "idea", "ai", "instagram", "ipfs",
  "java", "js", "jenkins", "jest", "jquery", "kafka", "kali", "kotlin", "ktor", "kubernetes",
  "laravel", "latex", "less", "linkedin", "linux", "lit", "lua", "md", "mastodon", "materialui",
  "matlab", "maven", "mint", "misskey", "mongodb", "mysql", "neovim", "nestjs", "netlify", "nextjs",
  "nginx", "nim", "nix", "nodejs", "notion", "npm", "nuxtjs", "obsidian", "ocaml", "octave",
  "opencv", "openshift", "openstack", "p5js", "perl", "ps", "php", "phpstorm", "pinia", "pkl",
  "plan9", "planetscale", "pnpm", "postgres", "postman", "powershell", "pr", "prisma", "processing", "prometheus",
  "pug", "pycharm", "py", "pytorch", "qt", "r", "rabbitmq", "rails", "raspberrypi", "react",
  "reactivex", "redhat", "redis", "redux", "regex", "remix", "replit", "rider", "robloxstudio", "rocket",
  "rollupjs", "ros", "ruby", "rust", "sass", "spring", "sqlite", "stackoverflow", "styledcomponents", "sublime",
  "supabase", "scala", "sklearn", "selenium", "sentry", "sequelize", "sketchup", "solidity", "solidjs", "svelte",
  "svg", "swift", "symfony", "tailwind", "tauri", "tensorflow", "terraform", "threejs", "twitter", "ts",
  "ubuntu", "unity", "unreal", "v", "vala", "vercel", "vim", "visualstudio", "vite", "vitest",
  "vscode", "vscodium", "vue", "vuetify", "wasm", "webflow", "webpack", "webstorm", "windicss", "windows",
  "wordpress", "workers", "xd", "yarn", "yew", "zig"
];



export default function IconBuilder() {
  const [search, setSearch] = useState('')
  const [selectedIcons, setSelectedIcons] = useState<string[]>([])
  const [filteredIcons, setFilteredIcons] = useState(availableIcons)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isCentered, setIsCentered] = useState(false)
  const [iconsPerLine, setIconsPerLine] = useState(15)

  useEffect(() => {
    setFilteredIcons(
      availableIcons.filter(icon => 
        icon.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  const toggleIcon = (icon: string) => {
    setSelectedIcons(prev => 
      prev.includes(icon) 
        ? prev.filter(i => i !== icon) 
        : [...prev, icon]
    )
  }

  const generateUrl = () => {
    const baseUrl = 'https://skillicons.dev/icons'
    const iconParams = selectedIcons.join(',')
    const themeParam = isDarkTheme ? '' : '&theme=light'
    const centerParam = isCentered ? '&center=true' : ''
    const perlineParam = iconsPerLine !== 15 ? `&perline=${iconsPerLine}` : ''
    return `${baseUrl}?i=${iconParams}${themeParam}${centerParam}${perlineParam}`
  }

  const generateMarkdown = () => {
    const url = generateUrl()
    return `[![My Skills](${url})](https://skillicons.dev)\n\nMy Skills`
  }

  const generateHtmlCentered = () => {
    const url = generateUrl()
    return `<p align="center">
  <a href="https://skillicons.dev">
    <img src="${url}" />
  </a>
</p>`
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Skill Icon Builder</h1>
      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        {filteredIcons.map((icon) => (
          <Card
            key={icon}
            className={`p-4 cursor-pointer transition-colors ${
              selectedIcons.includes(icon) ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => toggleIcon(icon)}
          >
            <img 
              src={`https://skillicons.dev/icons?i=${icon}`} 
              alt={icon} 
              className="w-12 h-12 mx-auto mb-2"
            />
            <p className="text-center text-sm">{icon}</p>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Switch
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            id="theme-toggle"
          />
          <label htmlFor="theme-toggle">Dark Theme</label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={isCentered}
            onCheckedChange={setIsCentered}
            id="center-toggle"
          />
          <label htmlFor="center-toggle">Center Icons</label>
        </div>
        <div className="flex items-center gap-2 flex-grow">
          <label htmlFor="icons-per-line">Icons per line: {iconsPerLine}</label>
          <Slider
            id="icons-per-line"
            min={1}
            max={50}
            step={1}
            value={[iconsPerLine]}
            onValueChange={([value]) => setIconsPerLine(value)}
            className="w-full max-w-xs"
          />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div className={`flex flex-wrap gap-2 ${isCentered ? 'justify-center' : ''}`}>
          <img src={generateUrl()} alt="Selected Skills" className="max-w-full" />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Markdown Code</h2>
        <Input value={generateMarkdown()} readOnly />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">HTML Code (Centered)</h2>
        <Input value={generateHtmlCentered()} readOnly />
      </div>
    </div>
  )
}