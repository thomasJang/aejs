[![Build Status](https://travis-ci.org/aeei/aejs.svg)](https://travis-ci.org/aeei/aejs)
# aejs
```
https://rawgit.com/aeei/aejs/master/dist/ae.min.js
```

# equalAll flowchart

```flow
st=>start: START

eT=>end: TRUE
eF=>end: FALSE

opC=>operation: compare a and b

io=>inputoutput: a, b

sb=>subroutine: array & object

condC=>condition: equal
class type
condP=>condition: is
primitive
condCP=>condition: a===b

st->io->condC
condC(yes)->condP
condC(no)->eF
condP(yes)->condCP
condP(no)->sb
condCP(yes)->eT
condCP(no)->eF
sb(right)->io

```

# SUBROUTINE: array & object

```flow
st=>start: START
e=>end: END
eT=>end: TRUE
eF=>end: FALSE
condA=>condition: is
array
condAL=>condition: equal
length
condH=>condition: has own property
&& a===b

st->condA
condA(yes)->condAL
condA(no)->condH
condAL(yes)->e
condAL(no)->eF
condH(yes)->e
condH(no)->eF
```
