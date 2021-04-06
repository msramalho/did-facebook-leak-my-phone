
function findGetParameter(parameterName) {
	var result = null, tmp = [];
	location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
	return result;
}

$(function () {
	let input = $("#search");

	let data = false;
	$.getJSON("hashed_data.json", function (json) {
		data = json.name;
		$("#loading").remove();
		$("#loaded").show();
		lookup();
	});

	let phone = findGetParameter("phone");
	if (phone !== null && phone.length > 0) {
		input.val(phone);
	}

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
	const lookup = () => {
		let v = smart_phone(input.val());

		if (data !== false && v !== false) {
			let hash = _hash(v);
			if (hash in data) {
				display(`deste deu: <i style='color:#FF5733'>${data[hash].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i> :(`);
				return;
			}
			display(`deste não deu :)`);
			return;
		}
		display(`-`);
	}

	$('.search').keyup(lookup);

});
