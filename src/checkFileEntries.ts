import checkLink from "./checkLink";
import scrapeLinks from "./scrapeLinks";
import asyncMap from "./async-map";

import {
  FileContentEntry,
  FileChecksEntry,
  LinkCheck,
  CheckLinkOptions,
  CheckLinkArgs,
} from "./types";

const getURL = (link: string, rootURL: string | URL) => {
  try {
    return new URL(
      /^(https?:\/)?\//.test(link) ? link : `https://${link}`,
      rootURL
    );
  } catch (e) {
    return null;
  }
};

export const checkFileEntry: (
  entry: FileContentEntry,
  options: CheckLinkOptions
) => Promise<FileChecksEntry> = async (
  { filePath, content },
  { rootURL, linkIncludePatterns, linkExcludePatterns, dryRun }
) => {
  const resolvedEntry = {
    filePath,
    content: await (typeof content === "function"
      ? content(filePath)
      : content),
  };
  const checks = (
    await asyncMap<string, LinkCheck>(
      scrapeLinks(resolvedEntry),
      async (link: string) => {
        const url = getURL(link, rootURL);
        if (!url) return null;
        const check = await checkLink({
          link,
          url,
          linkIncludePatterns,
          linkExcludePatterns,
          dryRun,
        } as CheckLinkArgs);
        return check;
      }
    )
  ).filter(Boolean);
  return {
    filePath,
    checks,
  };
};

export const checkFileEntries: (
  fileContentEntries: FileContentEntry[],
  options?: CheckLinkOptions
) => Promise<FileChecksEntry[]> = async (fileContentEntries, options) => {
  return (
    await asyncMap<FileContentEntry, FileChecksEntry>(
      fileContentEntries,
      (entry: FileContentEntry) => checkFileEntry(entry, options)
    )
  ).filter(Boolean);
};
