# UXioms = UX + Axioms

You can get everything running nicely locally with a nice little bash script plopped in your `.bash_profile`:

	function uxioms() {
	    cd ~/ws/uxioms
	    coffee -wco public/js src/js&
	    myth -wv src/css/* public/css/*&
	    DEBUG=express:* nodemon app.js&
	    open http://localhost:2222
	}
