---
title: On How to Write (good or just ordinary) Documentation
date: February 14, 2022
---

As developers, writing documentation can feel tedious, especially when you hit writer’s block. Here are some points that can help you create better documentation.

This post is summarized from [this source](https://www.youtube.com/watch?v=R6zeikbTgVc).

**1. Start with what the reader needs**

Begin by asking: **What does the reader need to know?**  
What information will help them get their job done?
For example, your reader (maybe a new teammate) might need to know:

- How to use an internal tool your team relies on.
- How a past project was structured.
- How to reproduce an environment locally.

**2. Write less**

Keep it concise. You don’t need to write long documentation — just what’s necessary.  
Always ask:

- Does the reader need this context?
- Do they really need this detailed CLI command?

Long documentation requires more maintenance, and unmaintained docs quickly become outdated.  
Outdated documentation isn't just useless — it can mislead users.

**3. Write an outline first**

Start by answering the key questions mentioned above, then draft an outline of headings based on what the reader needs.  
Under each heading, add bullet points or notes you’ll expand later.  
This makes the writing process easier and more organized.

**4. Use the rubber duck method**

This isn't specific to writing docs, but it helps. Try explaining your topic out loud — as if you’re talking to a “rubber duck.”  
It's often easier to explain things verbally first, and documentation doesn't need to sound overly formal.

**5. Write for readability**

Your goal is to make the reader’s job easier. Write in a way that’s simple to follow.

- Use short bullet points instead of long paragraphs.
- Prefer instructional language over general explanations.

For example:

> ✅ “Run command A and expect result B.”  
> ❌ “You can expect result B if you execute command A.”

Also, make headers actionable:
- Instead of “Custom code generation,” use “Writing a code generator.”  
  The latter makes it clear what the reader will learn.

**6. Don't use documentation to patch problems**

If you're writing documentation to fix a recurring issue, you might be addressing the wrong problem.  
Fix the root cause instead of documenting around it.

**Source:**  
[Writing Effective Documentation (YouTube Video)](https://www.youtube.com/watch?v=R6zeikbTgVc)