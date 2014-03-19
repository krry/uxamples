# UXioms = UX + Axioms

## To build this app locally
1. Install [node.js](http://nodejs.org)
2. Move to your workspace directory: `cd ~/yrCodez/`
3. Clone this repo: `git clone git@github.com:krry/uxioms && cd uxioms`
4. Run `npm update` to download the app's dependencies
5. Start the server: `node app.js`

**Protip**: you can get all the precompilers and the app running nicely with this tasty bash script plopped in your `.bash_profile`:

	function uxioms() {
	    cd ~/ws/uxioms
	    coffee -wco public/js src/js&
	    myth -wv src/css/* public/css/*&
	    DEBUG=express:* nodemon app.js&
	    open http://localhost:2222
	}
