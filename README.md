Uses a patched version of https://github.com/arturadib/strapdown which supports a 'source' tag, along with some extra features to navigate the tutorial files I tend to generate which are bulleted list outlines of the content.

##Usage
* clone this repo
* rename example.html to whatever you want it to be
* update the source attribute of the xmp tag
* If needed configure the focusSelector to be whatever you want to jump between, defaults to `ul > li`. See example in example.html.


##Features
* Base styles to make things look _generally_ better than the default slate theme
* j/k navigation highlighting the current talking point
* That's pretty much all I need. I mean, it just renders a markdown file pretty-like and lets me display it in a highly readable way for presentations

##Acknowledgements
* https://github.com/arturadib/strapdown
