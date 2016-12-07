# Contributing

There are few important requirements:

- Commit messages must follow simplified **AngularJS Git Commit Message Conventions**. It's needed for automatic releases using [semantic-release](https://github.com/semantic-release/semantic-release). Simplified means that it's not required to specify a scope and a footer in a commit message.

Example commit message:
```
fix: Make developers happy
```

A body is desirable but not required as well. It can explain **why** did you make such change but should not explain what did you do.

```
fix: Make developers happy

Happy developers are better than angry developers
```

Don't worry to make a mistake. Git hook throws an error when bad commit message is used. Also you can run ``npm run commit`` instead of ``git commit`` to commit your changes via CLI prompt powered by [commitizen](https://github.com/commitizen/cz-cli).

- It is required to have one commit per fix/feature/chore etc.
- Fixes (more than just a fix of a typo) and features (any # of lines) must be followed by a test.
- The coverage must not be lower after your commit (Coveralls integration will warn about it).
- New features need to be discussed first (open an issue).
