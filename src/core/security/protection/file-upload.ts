/**
 * ============================================================================
 * FILE: file-upload.ts
 * LAYER: core
 * TYPE: protection
 * ============================================================================
 *
 * PURPOSE:
 * -> Validate uploaded files for security risks (MIME type, size).
 * -> Prevent malicious file uploads (e.g., executables, massive files).
 *
 * RESPONSIBILITY:
 * -> Enforce file size limits.
 * -> Enforce allowed MIME types whitelist.
 *
 * ARCHITECTURE POSITION:
 * -> Used by API Routes handling file uploads.
 *
 * DATA FLOW:
 * -> File Object -> [Validation Logic] -> Boolean/Error.
 *
 * SECURITY:
 * -> CRITICAL: Prevents server compromise via webshells or DoS (disk filling).
 *
 * PERFORMANCE:
 * -> Fast metadata checks.
 *
 * IMPROVEMENTS:
 * -> Add Magic Byte inspection for true file type detection.
 * -> Scan for malware (ClamAV integration).
 *
 * STATUS:
 * -> Stable
 *
 * ============================================================================
 */

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface FileValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateFile = (file: File): FileValidationResult => {
    if (file.size > MAX_FILE_SIZE) {
        return { isValid: false, error: 'File size exceeds 5MB limit.' };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return { isValid: false, error: 'Invalid file type. Only JPG, PNG, and PDF are allowed.' };
    }

    // Additional checks (magic bytes) would go here for stricter validation
    return { isValid: true };
};
