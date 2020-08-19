# Link Check

Want to ensure that all the links in your git-based website are alive? This
project may help!

This script searches through the source file content of either a directory or a
git branch's difference from master. This means it's possible to both verify the
life of every link in the repo and perform much smaller checks on branches to
quickly ensure all new links are valid.

## Options

### source: "git-diff" | "filesystem" = "git-diff"

This string determines how the action will source content

"git-diff" uses the diff between the current working area and origin/master. It
effectively means that this mode checks links that would be new to master if the
current state of the program were merged, and that this will provide no links
when checking out an up-to-date master.

### rootURL: string

This string is used as the base for root-relative links (those that start with
'/'). It's useful for specifying a deploy preview or local server, particularly
from GitHub Actions.

### linkIncludePatterns: string[]?

When provided, links to check will be limited to those that pass a `micromatch`
test with this option as the pattern. Otherwise, all links will be used.

### linkExcludePatterns: string[]?

When provided, links that pass a `micromatch` test with this option as the
pattern will show up on the test, passing with no test necessary.

Exclusions take precedence over inclusions.

### fileIncludePatterns: string[]?

When provided, files to check links in will be limited to those whose filenames
that pass a `micromatch` test with this option as the pattern. Otherwise, all
files from the content source will be used.

### fileExcludePatterns: string[]?

When provided, files whose filenames match a `micromatch` check with this option
as its pattern will be completely excluded from checks and reports.

Exclusions take precedence over inclusions.

## Runners

### CLI

#### Link Check option flags

To specify multiple patterns or pattern files, use the relevant flag multiple times.

##### -s / --source
##### -r / --rootURL
##### --li / --link-include-pattern
##### --le / --link-exclude-pattern
##### --fi / --file-include-pattern
##### --fe / --file-exclude-pattern
##### --lif / --link-include-pattern-file
##### --lef / --link-exclude-pattern-file
##### --fif / --file-include-pattern-file
##### --fef / --file-exclude-pattern-file

#### CLI-specific options

##### -u / --report-unused-patterns

When finished with the link check, log link exclusion patterns that weren't used.
Generally, it only makes sense to use this on a full-repo filesystem check.

##### -v / --verbose

Log fully parsed options before starting. File-based patterns will have already
been resolved and combined with ones defined in arguments.

##### -z / --always-exit-zero

Normally, the CLI runners exits with code 2 if a link has failed. This means CI
applications running it from shell can break if a link fails.

With this option specified, the CLI checker will always exit with code 0. This
allows the link check to be run as optional in CI pipelines that run off exit
codes.

### GitHub Action

#### Link Check Option Inputs

To specify multiple patterns or pattern files, provide a JSON-parsable array of
strings as the relevant option's input.

##### rootURL
##### linkIncludePatternFiles
##### linkIncludePatterns
##### linkExcludePatternFiles
##### linkExcludePatterns
##### fileIncludePatternFiles
##### fileIncludePatterns
##### fileExcludePatternFiles
##### fileExcludePatterns
