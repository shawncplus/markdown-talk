Patched version of https://github.com/arturadib/strapdown which supports a 'source' tag, along with some extra features to navigate the tutorial files I tend to generate which are bulleted list outlines of the content.

##Usage
* clone this repo
* rename example.html to whatever you want it to be
* Specifying markdown can be done any of the following ways:
    * Putting it directly into the `<xmp></xmp>` tag. (Base functionality of strapdown)
    * A reference in in the 'source' attribute of the xmp tag, reference being one of:
        * `source="foo.md"` - Reference to file on the same server
        * `source="githubuser/repo"` - Will pull the README at master from the given repo
        * `source="githubuser/repo:some/doc/path/foo.mkd"` - Github user/repo:filepath-from-repo-root
        * `source="githubuser/repo:some/doc/path/foo.mkd:abe823e"` - Github ref at specific commit id
    * Specify as a `source=` query parameter in any of the above formats
* If needed configure the focusSelector to be whatever you want to jump between, defaults to `ul > li`. See example in example.html. As with `source` this can be specified as a `focus=` query parameter
* If needed you can turn code prettifying on/off, see example.html (defaults to on)
* If you want to have an outline just put `buildOutline: true` in the `MarkdownTalk` config.



##Features
* Base styles to make things look _generally_ better than the default slate theme
* j/k navigation highlighting the current talking point
* That's pretty much all I need. I mean, it just renders a markdown file pretty-like and lets me display it in a highly readable way for presentations

##In Action
* http://shawnbiddle.com/bash/

##Acknowledgements
* https://github.com/arturadib/strapdown
