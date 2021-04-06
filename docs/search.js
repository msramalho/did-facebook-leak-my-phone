$(function () {

	let data = false;
	$.getJSON("hashed_data.json", function (json) {
		data = json.name;
		$("#loading").remove()
		$("#loaded").show()
	});

	// Auto-selection when clicked
	$(".search").click(function () {
		$(this).select();
		$(".search").css('color', 'black');
	});

	const _hash = (v) => sha256(v).substring(48);
	const smart_phone = (v) => {
		if (v.length < 9) return false
		if (v.length === 9) return "351" + v
		else return v;
	};
	const display = (message) => $("#result").html(message);


	$('.search').keyup(function () {
		let v = smart_phone(this.value);

		if (data !== false && v !== false) {
			let hash = _hash(v);
			if (hash in data) {
				display(`deste já deu: <i style='color:#FF5733'>${data[hash].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i> :(`);
				return;
			}
		}
		display(`deste não deu :)`);
	});



});