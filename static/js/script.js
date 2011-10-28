var baseUrl = '';

var hashes = [];
var hashCloud = [];

$(function() {
    $.getJSON(baseUrl + '/Me/links?limit=1000&full=1', function(data) {
        for (var i=0; i<data.length; ++i) {
            if (data[i].encounters.length === 0 ||
                !data[i].encounters[0].via.hasOwnProperty('entities') ||
                data[i].encounters[0].via.entities.hashtags.length === 0) {
                continue;
            }

            for (var j=0; j<data[i].encounters[0].via.entities.hashtags.length; ++j) {
                hashCloud.push(data[i].encounters[0].via.entities.hashtags[j].text.toLowerCase());
            }
            
            var counted = countHashes(hashCloud);
        }
        
        for (var k=0; k<counted[0].length; k++) {
            if (counted[1][k] > 1 && counted[0][k].length > 1) {
                $('#tag-links').append('<li><a target="_blank" href="/Me/linkalatte/#search-'+counted[0][k].toLowerCase()+'" data-weight="'+((+counted[1][k]+6)*1.6)+'">'+counted[0][k].toUpperCase()+'</li>');
            }
        }
        
        $("#loading-div").fadeOut(function() {
            if (!$('#myCanvas').tagcanvas({
                interval: 20,	
                textFont: 'Helvetica, Arial Black, sans-serif',	
                textColour: '#111',	
                textHeight: 25,	
                outlineColour: '#999',	
                outlineThickness: 3,	
                maxSpeed: 0.03,	
                minBrightness: 0.1,	
                depth: 0.92,	
                pulsateTo: 0.2,	
                pulsateTime: 0.75,	
                initial: [0.1, -0.1],	
                decel: 0.98,	
                reverse: true,	
                hideTags: false,	
                shadow: '#ccc',	
                shadowBlur: 3,	
                weight: true,	
                hideTags: true,
                weightFrom: 'data-weight'
            }, 'tag-links')) {
                $('#myCanvasContainer').hide();
            }
            
        });
        
        //console.log(counted);
    });
});

function countHashes(arr) {
    var a = [], b = [], prev;
    arr.sort();
    for (var i=0; i<arr.length; i++) {
        if (arr[i] !== prev) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}