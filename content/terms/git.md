# Hover explanations for Git commands: term :: one-line explanation.

git :: Version control: records snapshots (commits) of your project so you can review, share and undo.
config :: Reads or sets Git settings; --global applies to every repository on this computer.
init :: Turns the current folder into a new Git repository.
clone :: Downloads a repository and its full history.
status :: Shows changed, staged and untracked files.
diff :: Shows line-by-line changes not yet staged (--staged: what's about to be committed).
add :: Stages changes so they go into the next commit; -p picks parts, -A everything.
commit :: Saves the staged changes as a snapshot with a message.
push :: Uploads your commits to the remote (e.g. GitHub).
pull :: Downloads new commits and merges (or with --rebase, replays yours on top).
fetch :: Downloads new commits without changing your files.
remote :: Manages links to other copies of the repository; -v lists them.
origin :: The default name for the remote you cloned from (usually GitHub).
main :: The usual name of the main branch.
log :: Commit history; --oneline compact, --graph draws branches.
show :: Details and changes of one commit.
blame :: Who last changed each line, and in which commit.
branch :: Lists, creates, renames (-m) or deletes (-d/-D) branches.
switch :: Changes branch; -c creates a new one.
checkout :: Older all-purpose command for switching branches or restoring files.
merge :: Combines another branch's commits into the current branch.
rebase :: Replays your commits on top of another branch for a straight history.
stash :: Puts uncommitted changes aside so you can switch tasks; pop brings them back.
pop :: Re-applies the latest stash and removes it from the list.
tag :: Names a commit, e.g. a release version; -a makes an annotated tag.
restore :: Discards changes to files, or unstages them with --staged.
reset :: Moves the branch back: --soft keeps changes staged, --hard throws them away.
revert :: Makes a new commit that undoes an earlier one — safe for pushed history.
reflog :: Every position HEAD has been in; your safety net for "lost" commits.
cherry-pick :: Copies a single commit onto the current branch.
bisect :: Binary-searches history to find the commit that introduced a bug.
rm :: Deletes a file and stages the deletion; --cached stops tracking but keeps the file.
mv :: Renames/moves a file and stages the change.
clean :: Deletes untracked files; -n previews, -fd actually deletes files and folders.
check-ignore :: Explains which .gitignore rule ignores a path (-v).
alias :: A shortcut name for a longer Git command.
HEAD :: The commit you currently have checked out. HEAD~1 is its parent.
--global :: Applies the setting to all repositories for your user.
--staged :: Refers to the staging area (what will go into the next commit).
--amend :: Replaces the last commit (new message and/or extra changes).
--no-edit :: Keep the existing commit message.
--soft :: Undo commits but keep their changes staged.
--hard :: Undo commits and discard their changes — can't be undone easily.
--rebase :: Pull by replaying your commits on top instead of merging.
--oneline :: One line per commit in log.
--graph :: Draws the branch structure in log.
--all :: Includes every branch.
--follow :: Keeps tracking a file's history across renames.
--abort :: Cancels a merge or rebase in progress.
--continue :: Carries on a rebase after fixing conflicts.
--ours :: In a conflict, take your version.
--theirs :: In a conflict, take the incoming version.
--force-with-lease :: Force-push only if nobody else has pushed in the meantime.
--tags :: Push tags as well.
--detach :: Check out a commit or tag without being on a branch.
--delete :: Deletes a branch on the remote.
--cached :: Acts on the staging area only, leaving your files alone.
--word-diff :: Shows changed words instead of whole lines.
--grep :: Finds commits whose message matches a pattern.
--source :: The commit to restore a file from.
--list :: Lists all settings.
-m :: Gives the commit/tag message (or renames a branch).
-u :: Sets the upstream so later git push/pull know where to go.
-S :: Finds commits that added or removed the given text.
