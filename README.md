# FOLD Viewer

[**FOLD** (Flexible Origami List
Datastructure)](https://github.com/edemaine/fold/blob/master/doc/spec.md)
file viewer implemented in TypeScript using [Three.js](https://threejs.org)

## Why Another Viewer?

There is a good [viewer](https://edemaine.github.io/fold/examples/foldviewer.html)
created by Jason Ku. It's an excellent implementation. But it's written in
CoffeeScript and I wanted a more accessible and extensible implementation that
can be part of [the bigger growing system for origami
simulation](http://d-origami.com) so I made the following decisions:

* TypeScript as an implementation language
* Three.js as a 3D framework

## So Is It Worth?

The sophisticated type system of TypeScript makes it possible to express the
[FOLD file format
specification](https://github.com/edemaine/fold/blob/master/doc/spec.md) in a
very concise and elegant way (as in [`fold_format.ts`](src/data/fold_format.ts)).
As the FOLD format specification evolves, maintaining the implementation
reflecting the new changes in the specification would be a no-brainer.

## Usage

1. Install node packages: `npm install`
1. Run `start` task: `npm start`
1. Visit <http://localhost:8080>
