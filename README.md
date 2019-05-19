# superstar-hangul
비밀이다 🤫

## Quickstart

Please install [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) to be able to run this project! You may need to install Homebrew or other package manager of choice to get yarn :/

Once you have that all set up, clone the repo, `cd superstar-hangul` and run `npm install` to download the repo's dependencies. Finally, run `yarn start` to run the app. That should launch the main page of the app.
화이팅!!

## Style
In general, style is enforced by the linter which runs during every code change you make while `yarn start` is running. So, make sure to resolve any errors or warnings after you've made code changes and before you commit!

On top of that, this codebase is using 2 spaces as the indent. The linter should yell about any inconsistencies.

Pro-tip: Check the terminal output to see what new errors or warnings arise when you've completed an incremental change. This makes it way easier to fix them over time as opposed to tackling 30 at the end.

Regular incremental commits are encouraged as long as they are relatively complete chunks of logic that are isolated or don't drastically break the game. Breaking changes that are committed to master make it hard for contributors to work in parallel.

## Notes
The current latest supported npm version for this project is **6.9.0**. Check yours with `npm -v`.

### Cleaning Repo

#### Untracked files
Have random files unintentionally floating around in your repo? As long as you've committed or stashed the stuff you actually want to hold on to, you can do `git clean -fx` in your repo to delete all *untracked* files (files that the git repo thinks are "new"/files that you have not committed). This includes ones hidden by the .gitignore that have yet to be committed.

#### Re-birthing your node_modules
If your dependencies get messed up, you can nuke your node_modules via `rm -r node_modules` and reinstall with `npm install`. You may also want to do a `npm audit fix` if, at the end of the install, it spits out a warning about vulnerabilities that may need fixing via that command.
