# Common Voice Partner Challenge Pilot: Engineering Primer

**_This is a living document. I will update it as more information becomes available / needed._**

## Contact

Hi, I'm Riley. I'm the lead engineer on Common Voice's Open Voice Challenge, and I'm really excited to work together on this. My email is rshaw@mozilla.com. If you need to send me a direct message, I'm [@rileyjshaw](https://keybase.io/rileyjshaw) on [Keybase](https://keybase.io/). Please let me know if you have questions, run into issues during setup, or need help with anything.

I understand that Catherine will be working on the front-end, and Can on the back-end. I've split this document into front- and back-end sections where useful, but you may want to read the whole thing anyway.

## Project background

[Common Voice](https://voice.mozilla.org/en) is open source software. [Browse the source code here](https://github.com/mozilla/voice-web).

In this project, we are creating a new way for teams to use Common Voice. Users can join company teams, compete against other teams, and see their team progress reflected on a Challenge dashboard.

You may find the following sources useful in providing further context to the project:

- [Common Voice homepage](https://voice.mozilla.org/en)
- [Common Voice Engineering Handover](https://docs.google.com/document/d/1sn15hBvgVW4UGhaluwe5XItC7hjztVjZg1eNx3oNgbc/edit?ts=5d9c5da0)
- [Partner Challenge UI designs](https://miro.com/app/board/o9J_kwpdQeg=/)

There are many moving pieces to this project, but I believe these will be the biggest engineering tasks:

- The Challenge dashboard represents the most work on the front-end.
- The concept of joinable teams doesn't exist yet on Common Voice. Creating that system represents the most work on the back-end. This includes team formation, and caching / presenting statistics across a team of individual users.

## Setup

Both the front- and back-end of this project are written in Typescript. If you haven't already, you'll want to install it with:

```.js
npm install -g typescript
```

General software requirements and setup info can be found in [CONTRIBUTING.md](https://github.com/mozilla/voice-web/blob/master/CONTRIBUTING.md). Download and install all required software.

Once you have installed the project requirements listed in [CONTRIBUTING.md](https://github.com/mozilla/voice-web/blob/master/CONTRIBUTING.md) (Docker, Yarn, Typescript, etc), this should get a local server up and running:

```.sh
git clone https://github.com/mozilla/voice-web
cd voice-web
echo '{IMPORT_SENTENCES: false}' >> config.json # This significantly speeds up rebuilding.
docker-compose up
```

## Front-end

###

### Localization / i18n

We are not translating this project, so text should be written as raw English strings.

```.js
// Good:
<h1>This is a good heading</h2>

// Bad:
<Localized id='this-is-a-bad-heading'><h1 /></Localized>
```

If we reuse an already translated string or component, that's fine. But we shouldn't add any _new_ translated strings.

### Event tracking

We need to track specific user interactions for this pilot. Common Voice uses Google Analytics events for tracking. Most tracking functionality lives in [`web/src/services/tracker.ts`](https://github.com/mozilla/voice-web/blob/master/web/src/services/tracker.ts).

A sample event log looks like this:

```
trackProfile('create', locale); // From web/src/components/pages/profile/info/info.tsx
```

### Interfacing with the back-end

Calls to the back-end tend to live in [`src/services/api.ts`](https://github.com/mozilla/voice-web/blob/master/web/src/services/api.ts). They are typically triggered via the `useApi()` hook defined in [`web/src/hooks/store-hooks.ts`](https://github.com/mozilla/voice-web/blob/master/web/src/hooks/store-hooks.ts), or within a reducer wrapped with `useAction()` from the same file.

These calls correspond to routes in [`server/src/lib/api.ts`](https://github.com/mozilla/voice-web/blob/master/server/src/lib/api.ts).

## Back-end

The backend section of [the handover doc](https://docs.google.com/document/d/1sn15hBvgVW4UGhaluwe5XItC7hjztVjZg1eNx3oNgbc/edit?ts=5d9c5da0) goes into some useful detail on the architecture.

On the GitHub repo, [S3 storage has its own document](https://github.com/mozilla/voice-web/blob/master/docs/HOWTO_S3.md). **S3 is mainly used for hosting voice clips. Therefore, we probably won't need to use this.**

### Routes

Routes are listed in the [`server/src/lib/api.ts`](https://github.com/mozilla/voice-web/blob/master/server/src/lib/api.ts) file.

### Database

DB queries are listed in the [`server/src/lib/model/db.ts`](https://github.com/mozilla/voice-web/blob/master/server/src/lib/model/db.ts) file.

Migrations are described in [the handover doc](https://docs.google.com/document/d/1sn15hBvgVW4UGhaluwe5XItC7hjztVjZg1eNx3oNgbc/edit?ts=5d9c5da0). This is the main method for modifying the DB schema.

We also have direct (read-only) access to the DB. **Ask me for the credentials over [Keybase](https://keybase.io/)** ([@rileyjshaw](https://keybase.io/rileyjshaw)).
