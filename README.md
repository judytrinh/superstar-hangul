# superstar-hangul
비밀이다 🤫

## Quickstart

Please install [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) to be able to run this project! You may need to install Homebrew or other package manager of choice to get yarn :/

Once you have that all set up, clone the repo, `cd superstar-hangul` and run `yarn start`. That should launch the main page of the app.
화이팅!!

## Style
In general, style is enforced by the linter which runs during every code change you make while `yarn start` is running. So, make sure to resolve any errors or warnings after you've made code changes and before you commit!

On top of that, this codebase is using 2 spaces as the indent. The linter should yell about any inconsistencies.

## Notes
At the moment, all the node_modules have been checked in so that contributors can get started quickly without dealing with running install commands and possibly dealing with node/yarn/other dependency inconsistencies across environments.
If it becomes unwieldy or creates conflicts for other developers, they can be removed.

When you do need to add new dependencies to node_modules, please force add them with `git add -f node_modules/your-new-dependency` since node_modules is an ignored directory (see .gitignore). Also commit the generated `.yarn-lock` and `.package-lock` files, as well as the modification to `package.json` along with it. See Cleaning Repo section below for removal tips.

The current latest supported npm version for this project is **6.9.0**. Check yours with `npm -v`.

### Cleaning Repo

#### Untracked files
Accidentally added stuff to node_modules or installed a package you wanna get rid of? Have random files unintentionally floating around in your repo? As long as you've committed or stashed the stuff you actually want to hold on to, you can do `git clean -fx` in your repo to delete all *untracked* files (files that the git repo thinks are "new"/files that you have not committed). This includes ones hidden by the .gitignore that have yet to be committed.

#### Re-birthing your node_modules
If you don't wanna go through troubleshooting and prefer a fresh new start, you can nuke your node_modules via `rm -r node_modules` and reinstall with `npm install`. You may also want to do a `npm audit fix` if, at the end of the install, it spits out a warning about vulnerabilities that may need fixing via that command.
