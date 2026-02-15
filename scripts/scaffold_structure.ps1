# Scaffold Project Structure
$projectRoot = "c:\Projetos\portal"

# Definitions of directories to create
$directories = @(
    # Root Level
    "public\images\logo",
    "public\images\hero",
    "public\images\features",
    "public\images\testimonials",
    "public\images\team",
    "public\images\partners",
    "public\images\blog",
    "public\images\icons",
    "public\videos",
    "public\animations",
    "public\fonts",
    "public\locales\pt-BR",
    "public\locales\en-US",
    "public\locales\en-CA",
    "prisma",
    "tests\unit",
    "tests\integration",
    "tests\e2e",
    "docs",
    "scripts",

    # Src - App
    "src\app\public-routes\about\team",
    "src\app\public-routes\about\careers",
    "src\app\public-routes\features",
    "src\app\public-routes\pricing",
    "src\app\public-routes\blog\category",
    "src\app\public-routes\resources\documentation",
    "src\app\public-routes\resources\tutorials",
    "src\app\public-routes\contact",
    "src\app\public-routes\legal\privacy",
    "src\app\public-routes\legal\terms",
    "src\app\public-routes\legal\cookies",
    "src\app\public-routes\legal\compliance\gdpr",
    "src\app\public-routes\legal\compliance\lgpd",
    "src\app\public-routes\help\faq",
    "src\app\api\health",
    "src\app\api\contact",
    "src\app\api\newsletter",

    # Src - UI - Public - Navigation
    "src\ui\public\layouts",
    "src\ui\public\navigation\header\hooks",
    "src\ui\public\navigation\header\utils",
    "src\ui\public\navigation\header\types",
    "src\ui\public\navigation\footer\hooks",
    "src\ui\public\navigation\footer\utils",
    "src\ui\public\navigation\footer\types",

    # Src - UI - Public - Sections
    "src\ui\public\sections\hero\hooks",
    "src\ui\public\sections\hero\types",
    "src\ui\public\sections\features\hooks",
    "src\ui\public\sections\features\types",
    "src\ui\public\sections\pricing",
    "src\ui\public\sections\testimonials",
    "src\ui\public\sections\faq",
    "src\ui\public\sections\cta",
    "src\ui\public\sections\stats",
    "src\ui\public\sections\team",
    "src\ui\public\sections\partners",
    "src\ui\public\sections\security",
    "src\ui\public\sections\compliance",
    "src\ui\public\sections\content\blog",
    "src\ui\public\sections\content\forms",

    # Src - UI - Components
    "src\ui\components\button",
    "src\ui\components\input",
    "src\ui\components\card",
    "src\ui\components\badge",
    "src\ui\components\avatar",
    "src\ui\components\skeleton",
    "src\ui\components\spinner",

    # Src - UI - Overlays & Others
    "src\ui\overlays\modal",
    "src\ui\overlays\toast",
    "src\ui\overlays\dropdown",
    "src\ui\providers",
    "src\ui\tokens",
    "src\ui\theme",

    # Src - Domains
    "src\domains\marketing\services",
    "src\domains\marketing\entities",
    "src\domains\marketing\types",
    "src\domains\content\services",
    "src\domains\content\entities",
    "src\domains\content\repositories",
    "src\domains\content\types",
    "src\domains\newsletter\services",
    "src\domains\newsletter\entities",
    "src\domains\newsletter\types",
    "src\domains\contact\services",
    "src\domains\contact\entities",
    "src\domains\contact\types",

    # Src - Infrastructure
    "src\infrastructure\database",
    "src\infrastructure\cache",
    "src\infrastructure\email",
    "src\infrastructure\storage",
    "src\infrastructure\http",
    "src\infrastructure\external-apis",
    "src\infrastructure\cookies",
    "src\infrastructure\observability",

    # Src - Core
    "src\core\bootstrap",
    "src\core\config",
    "src\core\constants",
    "src\core\hooks",
    "src\core\utils",
    "src\core\logger",

    # Src - i18n
    "src\i18n\config",
    "src\i18n\hooks",
    "src\i18n\locales\pt-BR",
    "src\i18n\locales\en-US",
    "src\i18n\locales\en-CA",
    "src\i18n\middleware",
    "src\i18n\types",
    "src\i18n\utils",

    # Src - Types
    "src\types\domain",
    "src\types\api",

    # Src - Microfrontends
    "src\microfrontends\container",
    "src\microfrontends\registry",
    "src\microfrontends\contracts",
    "src\microfrontends\remote-loader",

    # Src - Shared
    "src\shared\utils",
    "src\shared\constants"
)

# Files to create (Placeholders)
$files = @(
    # Header
    "src\ui\public\navigation\header\Header.tsx",
    "src\ui\public\navigation\header\Header.mobile.tsx",
    "src\ui\public\navigation\header\Header.tablet.tsx",
    "src\ui\public\navigation\header\Header.desktop.tsx",
    "src\ui\public\navigation\header\header.module.css",
    "src\ui\public\navigation\header\header.styles.ts",
    "src\ui\public\navigation\header\hooks\useHeader.ts",
    "src\ui\public\navigation\header\utils\header-helpers.ts",
    "src\ui\public\navigation\header\types\header.types.ts",

    # Footer
    "src\ui\public\navigation\footer\Footer.tsx",
    "src\ui\public\navigation\footer\Footer.mobile.tsx",
    "src\ui\public\navigation\footer\Footer.tablet.tsx",
    "src\ui\public\navigation\footer\Footer.desktop.tsx",
    "src\ui\public\navigation\footer\footer.module.css",
    "src\ui\public\navigation\footer\footer.styles.ts",
    "src\ui\public\navigation\footer\hooks\useFooter.ts",
    "src\ui\public\navigation\footer\utils\footer-helpers.ts",
    "src\ui\public\navigation\footer\types\footer.types.ts",

    # Hero
    "src\ui\public\sections\hero\Hero.tsx",
    "src\ui\public\sections\hero\Hero.mobile.tsx",
    "src\ui\public\sections\hero\Hero.tablet.tsx",
    "src\ui\public\sections\hero\Hero.desktop.tsx",
    "src\ui\public\sections\hero\hero.module.css",
    "src\ui\public\sections\hero\hero.styles.ts",
    "src\ui\public\sections\hero\hooks\useHero.ts",
    "src\ui\public\sections\hero\types\hero.types.ts",

    # Features
    "src\ui\public\sections\features\Features.tsx",
    "src\ui\public\sections\features\Features.mobile.tsx",
    "src\ui\public\sections\features\Features.tablet.tsx",
    "src\ui\public\sections\features\Features.desktop.tsx",
    "src\ui\public\sections\features\features.module.css",
    "src\ui\public\sections\features\features.styles.ts",
    "src\ui\public\sections\features\hooks\useFeatures.ts",
    "src\ui\public\sections\features\types\features.types.ts"
)

# Helper function to create file with boilerplate if it doesn't exist
function New-FileIfNotExists {
    param($path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType File -Force -Path $path | Out-Null
        Write-Host "Created file: $path"
        
        # Add basic React component content if it's a component file
        if ($path -like "*.tsx") {
            $name = [System.IO.Path]::GetFileNameWithoutExtension($path)
            Set-Content -Path $path -Value "export const $name = () => {`n  return <div>$name</div>;`n};"
        }
    }
}

# Create Directories
foreach ($dir in $directories) {
    $fullPath = Join-Path $projectRoot $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Force -Path $fullPath | Out-Null
        Write-Host "Created directory: $dir"
    }
}

# Create Files
foreach ($file in $files) {
    $fullPath = Join-Path $projectRoot $file
    New-FileIfNotExists -path $fullPath
}

Write-Host "Structure generation completed successfully."
