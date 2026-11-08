---
name: Git
symbol: git
order: 8
color: #24365f
on: light
version: Git 2.30+
highlight: bash
check: skip
layout: sheet
description: Save, share and undo your work.
---

# Everyday

## Set up
@id first-time-configuration
@keywords config name email init clone default branch editor
- Your name / email :: git config --global user.name "George Philippou"; git config --global user.email "you@example.com"
- Default branch main :: git config --global init.defaultBranch main
- Editor :: git config --global core.editor "code --wait"
- New repository :: git init
- Copy a repository :: git clone https://github.com/GeorgePhilippou/syntax.git
- Show settings :: git config --list

## Status and diff
@id status-and-diff
@keywords status diff staged changes what changed
- What changed :: git status
- Short view :: git status -s
- Unstaged changes :: git diff
- Staged changes :: git diff --staged
- One file :: git diff src/main.c
- Words, not lines :: git diff --word-diff

## Stage and commit
@id stage-and-commit
@keywords add commit message stage all patch
- Stage a file :: git add src/main.c
- Stage everything :: git add -A
- Stage parts of a file :: git add -p
- Commit :: git commit -m "Average 16 ADC samples per step"
- Stage tracked + commit :: git commit -am "Fix CV step size"
- Unstage :: git restore --staged src/main.c
> One logical change per commit; write the message as "what it does": Add, Fix, Remove…

## Push and pull
@id push-and-pull
@keywords push pull fetch remote origin upstream sync github
- Send commits :: git push
- First push of a branch :: git push -u origin my-branch
- Get and merge :: git pull
- Get, replay mine on top :: git pull --rebase
- Just download :: git fetch
- Remotes :: git remote -v
- Add GitHub remote :: git remote add origin https://github.com/user/repo.git
> Pull before you start working, especially when another machine or session also pushes.

## History
@id viewing-history
@keywords log history graph show blame search who changed
- Compact log :: git log --oneline
- Graph of branches :: git log --oneline --graph --all
- Last 5 :: git log -5
- One commit :: git show a1b2c3d
- History of a file :: git log --follow -p src/adc.c
- Who changed each line :: git blame src/adc.c
- Commits mentioning text :: git log -S "LPM3_bits"
- By message :: git log --grep "DAC"

# Branches

## Branches
@id create-and-switch-branches
@keywords branch switch checkout create delete list rename
- List :: git branch
- New and switch :: git switch -c feature/averaging
- Switch :: git switch main
- Rename current :: git branch -m new-name
- Delete (merged) :: git branch -d feature/averaging
- Delete (force) :: git branch -D experiment
- Delete on GitHub :: git push origin --delete feature/averaging

## Merge and rebase
@id merge-a-branch
@keywords merge rebase conflict resolve squash fast forward
- Merge into current :: git merge feature/averaging
- Rebase onto main :: git rebase main
- Squash last 3 commits :: git reset --soft HEAD~3; git commit -m "One clean commit"
- See conflicts :: git status
- Keep mine / theirs :: git checkout --ours file.c; git checkout --theirs file.c
- After fixing conflicts :: git add file.c; git commit
- Give up a merge / rebase :: git merge --abort; git rebase --abort
- Continue rebase :: git rebase --continue
> Conflict markers: <<<<<<< yours, ======= , >>>>>>> theirs. Edit, delete the markers, then add.

## Stash
@id stash
@keywords stash save later pop apply switch branch
- Put changes aside :: git stash
- With a name :: git stash push -m "half-done plot"
- List :: git stash list
- Bring back :: git stash pop
- Include new files :: git stash -u

## Tags and releases
@id tags-and-releases
@keywords tag release version annotate push tags
- Tag this commit :: git tag -a v1.2 -m "Firmware 1.2"
- List tags :: git tag
- Push tags :: git push --tags
- Check out a tag :: git switch --detach v1.2

# Undo

## Undo changes
@id discard-local-changes
@keywords undo discard restore reset revert amend uncommit
- Discard edits to a file :: git restore src/main.c
- Discard all edits :: git restore .
- Fix last commit message :: git commit --amend -m "Better message"
- Add a forgotten file to last commit :: git add f.c; git commit --amend --no-edit
- Uncommit, keep changes :: git reset --soft HEAD~1
- Uncommit, discard changes :: git reset --hard HEAD~1
- Undo a pushed commit safely :: git revert a1b2c3d
- Get a file from a commit :: git restore --source a1b2c3d src/main.c
> Never reset --hard or force-push commits others may have pulled; use revert instead.

## Recover and fix mistakes
@id recover-lost-work
@keywords reflog recover lost commit wrong branch detached head cherry pick
- Everything HEAD has been :: git reflog
- Go back to a lost commit :: git switch -c rescue HEAD@{3}
- Committed to wrong branch :: git switch -c right-branch; git switch main; git reset --hard HEAD~1
- Copy one commit here :: git cherry-pick a1b2c3d
- Left detached HEAD :: git switch -c keep-this
- Force push (safely) :: git push --force-with-lease
- Find the bad commit :: git bisect start; git bisect bad; git bisect good v1.0

# Repository

## Ignore files
@id ignoring-files
@keywords gitignore ignore untrack remove cached
```bash .gitignore
*.o
*.elf
build/
__pycache__/
.DS_Store
data/raw/
```
- Stop tracking, keep file :: git rm --cached secrets.txt
- Why is it ignored :: git check-ignore -v build/fw.elf
- Remove untracked files (preview) :: git clean -n
- Remove untracked files :: git clean -fd

## Moving files
@id moving-and-deleting-files
@keywords mv rm rename delete move
- Rename / move :: git mv old.c new.c
- Delete :: git rm notes.txt

## Shortcuts
@id aliases
@keywords alias shortcut config
- Log alias :: git config --global alias.lg "log --oneline --graph --all"
- Status alias :: git config --global alias.st "status -s"
- Use them :: git lg; git st
