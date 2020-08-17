export interface FileEntry {
  filePath: string;
}

export interface StringFilter {
  (subject: string): boolean;
}

export interface FileContentEntry extends FileEntry {
  content:
    | string
    | string[]
    | ((filePath?: string) => string | string[] | Promise<string | string[]>);
}

export interface FileChecksEntry extends FileEntry {
  checks: LinkCheck[];
}

interface LinkSelectorPatterns {
  linkIncludePatterns: string | string[] | undefined;
  linkExcludePatterns: string | string[] | undefined;
}

export interface CheckLinkOptions extends LinkSelectorPatterns {
  rootURL?: string;
}

export interface CheckLinkArgs extends CheckLinkOptions {
  link: string;
  url: URL;
}

export interface LinkCheck {
  link: string;
  pass: boolean;
  description?: string;
  href?: string;
}

export interface OnCheckAPI {
  link: string;
  url: URL;
}

export interface AfterCheckAPI extends OnCheckAPI {
  check: LinkCheck;
}

export interface LinkCheckRateLimiter {
  pattern: string | string[];
  queue: unknown;
}