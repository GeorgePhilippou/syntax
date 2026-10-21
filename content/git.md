---
name: Git
symbol: git
order: 8
color: #c9c4bb
version: Git 2.30+
highlight: bash
check: skip
description: Every change, accounted for. Every mistake, undoable.
---

# Setup

## First-time configuration
@id config
@keywords config user name email editor default branch global setup
@diff git config --global

Tell Git who you are (once per machine).

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"   # or nano, vim
git config --global pull.rebase false           # merge on pull (or true to rebase)
git config --list --show-origin                 # see everything and where it's set
```

## Start a repository
@id init
@keywords init clone new repository create copy remote
@diff git init / git clone URL

Create a new repository or copy an existing one.

```bash
git init                                  # in the current folder
git init my-project                       # in a new folder
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git my-folder   # SSH, custom folder
git clone --depth 1 URL                   # latest snapshot only (faster)
```

## Ignoring files
@id gitignore
@keywords gitignore ignore untrack exclude rm --cached
@diff .gitignore patterns; rm --cached to untrack.

Keep files out of version control.

```bash
# .gitignore
node_modules/
dist/
*.log
.env
!keep.log          # exception: do track this one
/build             # only at the repo root

git rm --cached secrets.env     # stop tracking a file you already committed
git check-ignore -v file.log    # which rule ignores this file?
```

`.gitignore` doesn't affect files that are already tracked — untrack them with `git rm --cached` first.

## Aliases
@id aliases
@keywords alias shortcut config log graph
@diff git config --global alias.NAME

Shortcuts for long commands.

```bash
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.last "log -1 HEAD --stat"
git config --global alias.undo "reset --soft HEAD~1"
git st
git lg
```

# Everyday

## Status and diff
@id status
@keywords status diff staged changes what changed
@diff git status; git diff (--staged)

See what's changed.

```bash
git status                  # overview
git status -sb              # short form with branch
git diff                    # unstaged changes
git diff --staged           # what will be committed
git diff HEAD               # all changes since the last commit
git diff --stat             # files and line counts only
git diff main...feature     # changes on feature since it branched
```

## Stage and commit
@id commit
@keywords add commit stage message -m -a patch partial
@diff git add then git commit -m

Record changes.

```bash
git add file.txt                 # stage one file
git add src/                     # stage a folder
git add -A                       # stage everything (new, changed, deleted)
git add -p                       # choose hunks interactively
git commit -m "Add login form"
git commit -am "Fix typo"        # stage tracked files and commit
git commit                       # opens the editor for a longer message
```

Good messages: a short summary line (≤ 50 chars, imperative: "Add", "Fix"), a blank line, then details if needed.

## Fix the last commit
@id amend
@keywords amend last commit message forgot file edit
@diff git commit --amend

Change the most recent commit.

```bash
git commit --amend -m "Better message"   # reword
git add forgotten.txt
git commit --amend --no-edit             # add a file, keep the message
```

Amending rewrites history. Only amend commits you haven't pushed — or force-push carefully (see "Force push safely").

## Viewing history
@id log
@keywords log history oneline graph show commits author since file
@diff git log with filters.

Browse commits.

```bash
git log --oneline                    # compact
git log --oneline --graph --all      # branch structure
git log -5                           # last five
git log -p file.txt                  # history of a file with diffs
git log --author="Ada" --since="2 weeks ago"
git log main..feature                # commits on feature not on main
git show abc1234                     # one commit in full
git show HEAD~2:src/app.py           # a file as it was two commits ago
```

## Search history
@id log-search
@keywords grep log -S pickaxe find commit message blame who changed
@diff log --grep, log -S, blame.

Find when and why something changed.

```bash
git log --grep="login"              # commit messages containing "login"
git log -S "calculateTotal"         # commits that added/removed this text
git log -G "TODO.*urgent"           # commits whose diff matches a regex
git blame src/app.py                # who last changed each line
git blame -L 40,60 src/app.py       # only lines 40–60
git grep "useState"                 # search tracked files
```

## Moving and deleting files
@id files
@keywords rm mv rename delete move file
@diff git mv / git rm

Rename or remove tracked files.

```bash
git mv old_name.py new_name.py
git rm unused.py                   # delete and stage the deletion
git rm -r old_folder/
git rm --cached big_file.zip       # untrack but keep on disk
```

# Branches

## Create and switch branches
@id branch
@keywords branch switch checkout create new list
@diff git switch -c NAME

Work on separate lines of development.

```bash
git branch                       # list local branches
git branch -a                    # include remote branches
git switch -c feature/login      # create and switch
git switch main                  # switch to an existing branch
git switch -                     # back to the previous branch
git checkout -b feature/login    # older equivalent of switch -c
```

## Merge a branch
@id merge
@keywords merge combine fast-forward no-ff branch into main
@diff git merge BRANCH from the target branch.

Bring another branch's work into the current one.

```bash
git switch main
git pull                         # make sure main is current
git merge feature/login
git merge --no-ff feature/login  # always create a merge commit
git merge --squash feature/login # one combined change, then commit
git commit -m "Add login"
git merge --abort                # back out of a conflicted merge
```

## Resolve conflicts
@id conflicts
@keywords conflict merge conflict resolve markers ours theirs
@diff Edit markers, git add, then continue.

Fix a merge or rebase conflict.

```bash
git status                       # lists "both modified" files
# Edit each file; remove the markers:
# <<<<<<< HEAD
# your version
# =======
# their version
# >>>>>>> feature
git add resolved_file.py
git commit                       # for a merge
git rebase --continue            # for a rebase

git checkout --ours file.py      # keep your side entirely
git checkout --theirs file.py    # keep their side entirely
```

During a **rebase**, "ours" and "theirs" are swapped: "ours" is the branch you're rebasing onto.

## Rebase
@id rebase
@keywords rebase onto update branch linear history interactive squash
@diff git rebase main replays your commits on top.

Replay your commits on top of another branch.

```bash
git switch feature
git fetch origin
git rebase origin/main           # move feature onto the latest main
git rebase --continue            # after fixing conflicts
git rebase --abort               # give up, back to how it was
```

Never rebase commits that others have already pulled. Rebasing your own feature branch is fine.

## Squash and tidy commits
@id squash
@keywords interactive rebase squash fixup reword reorder edit commits
@diff git rebase -i HEAD~N

Combine, reorder or reword recent commits.

```bash
git rebase -i HEAD~3
# In the editor, change "pick" to:
#   squash (s)  merge into the previous commit, edit message
#   fixup  (f)  merge into the previous commit, discard message
#   reword (r)  change the message
#   drop   (d)  remove the commit
# Reorder lines to reorder commits.

git commit --fixup abc1234       # mark a fix for an earlier commit
git rebase -i --autosquash main  # apply all fixups automatically
```

## Delete and rename branches
@id branch-delete
@keywords delete branch rename remote branch prune -d -D
@diff git branch -d; git push origin --delete.

Clean up branches.

```bash
git branch -d feature/login           # delete (only if merged)
git branch -D feature/login           # force delete
git push origin --delete feature/login   # delete on the remote
git branch -m new-name                # rename the current branch
git branch -m old new                 # rename another branch
git fetch --prune                     # drop references to deleted remote branches
git branch --merged main              # branches safe to delete
```

## Cherry-pick
@id cherry-pick
@keywords cherry pick copy commit apply one commit
@diff git cherry-pick SHA

Copy a single commit onto the current branch.

```bash
git cherry-pick abc1234
git cherry-pick abc1234..def5678      # a range (excluding abc1234)
git cherry-pick -n abc1234            # apply changes without committing
git cherry-pick --abort
```

# Remotes

## Push and pull
@id push-pull
@keywords push pull fetch upstream origin sync remote -u
@diff git push -u origin BRANCH the first time.

Sync with a remote repository.

```bash
git push -u origin feature/login   # first push: sets the upstream
git push                           # afterwards
git pull                           # fetch + merge (or rebase)
git pull --rebase                  # fetch + rebase your local commits
git fetch                          # download without changing your files
git fetch --all --prune
git status                         # "ahead 2, behind 1" etc.
```

## Manage remotes
@id remotes
@keywords remote add origin url set-url upstream fork
@diff git remote add NAME URL

Connect your repository to remote ones.

```bash
git remote -v                               # list remotes
git remote add origin git@github.com:me/repo.git
git remote set-url origin https://github.com/me/repo.git
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git merge upstream/main                     # update a fork
git remote rename origin old-origin
```

## Force push safely
@id force-push
@keywords force push force-with-lease rewrite history overwrite remote
@diff --force-with-lease, never plain --force.

Overwrite a remote branch after rewriting history.

```bash
git push --force-with-lease
```

`--force-with-lease` refuses if someone else pushed in the meantime; plain `--force` silently discards their work. Never force-push to a shared `main`.

## Tags and releases
@id tags
@keywords tag release version annotated push tags
@diff git tag -a v1.0 -m "…"

Mark versions.

```bash
git tag                           # list
git tag -a v1.2.0 -m "Release 1.2.0"
git tag v1.2.0 abc1234            # tag an older commit
git push origin v1.2.0            # tags aren't pushed by default
git push --tags
git tag -d v1.2.0                 # delete locally
git push origin --delete v1.2.0   # delete on the remote
```

# Undo & fix

## Discard local changes
@id discard
@keywords discard changes restore checkout revert file throw away uncommitted
@diff git restore FILE

Throw away changes you haven't committed.

```bash
git restore file.txt             # discard unstaged changes to a file
git restore .                    # discard all unstaged changes
git restore --staged file.txt    # unstage, keep the changes
git restore --source=HEAD~2 file.txt   # file as it was 2 commits ago
git clean -n                     # preview deleting untracked files
git clean -fd                    # delete untracked files and folders
```

`git restore` and `git clean -f` can't be undone — the changes were never committed.

## Undo commits (reset)
@id reset
@keywords reset soft mixed hard undo commit uncommit go back HEAD~1
@diff --soft keeps staged; --mixed keeps files; --hard discards.

Move your branch back to an earlier commit.

```bash
git reset --soft HEAD~1    # undo commit, keep changes staged
git reset HEAD~1           # undo commit, keep changes unstaged (--mixed)
git reset --hard HEAD~1    # undo commit and DISCARD its changes
git reset --hard origin/main   # make local branch match the remote exactly
```

Use `reset` only on commits you haven't pushed. For pushed commits, use `revert`.

## Revert a pushed commit
@id revert
@keywords revert undo pushed commit public history safe
@diff git revert SHA adds an opposite commit.

Undo a commit without rewriting history.

```bash
git revert abc1234             # new commit that reverses abc1234
git revert HEAD                # reverse the latest commit
git revert -m 1 merge_sha      # revert a merge commit (keep parent 1)
git revert --no-commit a..b    # several reverts in one commit
```

## Recover lost work
@id reflog
@keywords reflog recover lost commit deleted branch undo reset hard
@diff git reflog remembers where HEAD has been.

Get back commits after a bad reset, rebase or branch delete.

```bash
git reflog                         # every position HEAD has been at
# a1b2c3d HEAD@{0}: reset: moving to HEAD~3
# e4f5a6b HEAD@{1}: commit: Add parser   <- the one you want
git reset --hard e4f5a6b           # go back there
git branch rescued e4f5a6b         # or put a branch on it
```

Anything you've ever committed is recoverable through the reflog for about 90 days.

## Stash
@id stash
@keywords stash save temporary shelve pop apply switch branch
@diff git stash; git stash pop.

Put work aside temporarily.

```bash
git stash                          # stash tracked changes
git stash -u                       # include untracked files
git stash push -m "half-done login"
git stash list
git stash pop                      # re-apply and remove the latest
git stash apply stash@{1}          # re-apply, keep in the list
git stash drop stash@{1}
git stash branch new-branch        # new branch from a stash
```

## Committed to the wrong branch
@id wrong-branch
@keywords wrong branch move commits main accident
@diff Branch off, then reset the original.

Move recent commits from main to a new branch.

```bash
# You're on main with 2 commits that belong on a feature branch:
git branch feature/oops            # new branch pointing at your commits
git reset --hard HEAD~2            # move main back (only if not pushed!)
git switch feature/oops
```

If the commits should go to an **existing** branch: switch to it, `git cherry-pick` them, then reset `main`.

## Detached HEAD
@id detached
@keywords detached HEAD checkout commit lost not on a branch
@diff Create a branch to keep your commits.

You checked out a commit and aren't on a branch.

```bash
git switch -c keep-this-work       # keep any commits you made here
git switch main                    # or just go back
```

# Advanced

## Find a bug with bisect
@id bisect
@keywords bisect binary search bug regression find commit
@diff git bisect start/good/bad

Binary-search history for the commit that broke something.

```bash
git bisect start
git bisect bad                     # current commit is broken
git bisect good v1.0               # this one worked
# Git checks out a middle commit. Test it, then:
git bisect good                    # or: git bisect bad
# ...repeat until Git names the first bad commit
git bisect reset                   # back to where you started

git bisect run ./test.sh           # automate: script exits 0 = good
```

## Worktrees
@id worktree
@keywords worktree multiple branches checkout parallel
@diff git worktree add PATH BRANCH

Check out several branches at once in separate folders.

```bash
git worktree add ../hotfix main         # main in a sibling folder
git worktree add -b feature/x ../x      # new branch in a new folder
git worktree list
git worktree remove ../hotfix
```

## Submodules
@id submodules
@keywords submodule nested repository dependency update recursive
@diff git submodule add / update --init --recursive

Include another repository inside yours.

```bash
git submodule add https://github.com/user/lib.git vendor/lib
git clone --recurse-submodules URL
git submodule update --init --recursive   # after a plain clone
git submodule update --remote              # pull latest submodule commits
```

## Compare and patch
@id patches
@keywords diff patch apply format-patch compare branches files
@diff git diff > file.patch; git apply.

Share changes as files.

```bash
git diff main..feature --stat           # summary of differences
git diff main feature -- src/app.py     # one file between branches
git diff > changes.patch
git apply changes.patch
git format-patch -3                     # last 3 commits as .patch files
git am *.patch                          # apply them as commits
```

## Clean up a repository
@id maintenance
@keywords gc prune clean size large files count-objects
@diff git gc; git count-objects -vH.

Inspect and shrink a repository.

```bash
git count-objects -vH            # repository size
git gc                           # compress and clean up
git remote prune origin          # stale remote branches
git ls-files | wc -l             # number of tracked files
```

To remove a large file from all history, use the separate `git filter-repo` tool, then force-push. Everyone must re-clone afterwards.
