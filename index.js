const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const fs = require("fs")

/*
fs.readFile(__dirname + '/views/user.html', 'utf8', function(err, html){

}

let htmlPage = “”,
newhtmlPage = htmlPage;

let raw_css = newhtmlPage.match(/(<style>).*?(<\/style>)/gm).map(match => {
	newhtmlPage = newhtmlPage.replace(match, '');
	return match.replace(/<style>|<\/style>/, '');
});
let compiled_css = raw_css.join('');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
	if (err) throw err;
	console.log('Saved!');
});
 */

rl.question("HTML file that you want to extract from (Full path suggested): ", function(INPUT_PATH) {
	rl.question("Output (HTML): ", function(OUTPUT_HTML_PATH) {
		rl.question("Output (CSS): ", function(OUTPUT_CSS_PATH) {
			fs.readFile(INPUT_PATH, 'utf8', function(err, ORIGINAL_HTML){
				if (err) throw err;

				let NEW_HTML;
				// /home/ivan/Desktop/separate_html_css/test.html

				let CSS_ARRAY = ORIGINAL_HTML.match(/(<style.*?>).*?(<\/style>)/gms).map(match => {
					NEW_HTML = ORIGINAL_HTML.replace(/(<style.*?>).*?(<\/style>)/gms, '');
					return match.replace(/<style.*?>|<\/style>/gms, '');
				});

				fs.writeFile(OUTPUT_HTML_PATH, NEW_HTML, function (err) {
					if (err) throw err;
					let NEW_CSS = CSS_ARRAY.join("\n\n");
					fs.writeFile(OUTPUT_CSS_PATH, NEW_CSS, function (err) {
						if (err) throw err;
						rl.close();
					});
				});
			});
		});
	});
});

rl.on("close", function() {
	console.log("\nDone!");
	process.exit(0);
});