# FOLD Viewer

[**FOLD** (Flexible Origami List
Datastructure)](https://github.com/edemaine/fold/blob/master/doc/spec.md)
file viewer implemented in TypeScript using [Three.js](https://threejs.org)

## Why Another Viewer?

There is a good [viewer](https://edemaine.github.io/fold/examples/foldviewer.html)
created by Jason Ku. It's an excellent implementation. But it's written in
CoffeeScript and I wanted a more accessible and extensible implementation that
can be part of [the bigger growing system for origami
simulation](https://d-origami.com) so I made the following decisions:

* TypeScript as an implementation language
* Three.js as a 3D framework

## Is It Worth?

The sophisticated type system of TypeScript makes it possible to express the
[FOLD file format
specification](https://github.com/edemaine/fold/blob/master/doc/spec.md) in a
very concise and elegant way (as in [`fold_format.ts`](src/data/fold_format.ts)).
As the FOLD format specification evolves, maintaining the implementation
reflecting the new changes in the specification would be a no-brainer.

## Usage

1. Install packages: `npm install`
1. Run: `npm run start` and visit <http://localhost:8080>.
1. Development
   + Live reload: `npm run dev` This runs the following tasks in parallel:
      - `_type-check-only` for live type checking using TypeScript compiler
      - `_test-watch` for rerunning tests when files change
      - `_esbuild-watch` for rebuilding when files change
      - `browser-sync` for reloading browser pages when files change
   + Test: `npm run test`
   + Lint: `npm run lint`

