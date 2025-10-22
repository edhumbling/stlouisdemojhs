# Git Author Configuration Guide

## Current Configuration (Generic)
```
Name: User
Email: user@example.com
```

## How to Set Your GitHub Identity

### Option 1: Set Globally (Recommended)
This will apply to all Git repositories on your computer:

```bash
# Replace with your actual GitHub username
git config --global user.name "YourGitHubUsername"

# Replace with your GitHub email
git config --global user.email "your-email@example.com"
```

**Important**: Use the email associated with your GitHub account!

### Option 2: Set for This Repository Only
This will only apply to this specific project:

```bash
# Replace with your actual GitHub username
git config user.name "YourGitHubUsername"

# Replace with your GitHub email
git config user.email "your-email@example.com"
```

## Find Your GitHub Email

### Primary Email
1. Go to https://github.com/settings/emails
2. Look for your primary email address
3. Use that email in the git config command

### Use GitHub No-Reply Email (Recommended for Privacy)
If you want to keep your email private:
1. Go to https://github.com/settings/emails
2. Check "Keep my email addresses private"
3. Use the no-reply email shown (format: `username@users.noreply.github.com`)

Example:
```bash
git config --global user.name "YourUsername"
git config --global user.email "username@users.noreply.github.com"
```

## Verify Your Configuration

After setting, verify with:
```bash
git config user.name
git config user.email
```

Or check all config:
```bash
git config --list
```

## Update Existing Commits (If Needed)

If you've already made commits with the wrong author, you can update the last commit:

```bash
# Update the last commit's author
git commit --amend --author="YourName <your-email@example.com>" --no-edit
```

For multiple commits, you'll need to use:
```bash
git rebase -i HEAD~N  # where N is the number of commits to change
```

## Quick Setup Commands

Copy and paste these commands (replace with your info):

```bash
# Set your GitHub username
git config --global user.name "YourGitHubUsername"

# Set your GitHub email
git config --global user.email "your-email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

## Example

If your GitHub username is `john-doe` and email is `john@example.com`:

```bash
git config --global user.name "john-doe"
git config --global user.email "john@example.com"
```

Or with no-reply email:
```bash
git config --global user.name "john-doe"
git config --global user.email "john-doe@users.noreply.github.com"
```

## After Configuration

Once configured, all future commits will use your GitHub identity. When you push to GitHub, your commits will be properly attributed to your account.

---

**Need Help?**
- Check your GitHub email: https://github.com/settings/emails
- GitHub docs: https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git
