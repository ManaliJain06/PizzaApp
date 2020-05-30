var sankeyData = [[]];
var j = 0;
function section1Build(){
    $("#bar1").css("color:black");
    $("#bar2").addClass("active");
    $("#selection1").hide();
    $("#selection2").show();
    $('input[name=inch]:checked').val();
}

function section2Build(){
    $("#bar3").addClass("active");
    $("#selection1").hide();
    $("#selection2").hide();
    $("#selection3").show();

    var i = 1;
    var toppingsSize = [['Toppings', 'Quantity']];
    var crustInch = $('input[name=inch]:checked').val();
    $('input:checkbox:checked').each(function(){
        toppingsSize[i] = [$(this).val(), parseInt($(this).attr('data-customevalue'))];
        sankeyData[j] = [crustInch, $(this).val(), parseInt($(this).attr('data-customevalue'))];
        i++;
        j++;
    });

    makePieChart(toppingsSize);
    makeSankeyCharts(sankeyData);
}

function getHome(){
    $("#selection1").show();
    $("#selection2").hide();
    $("#selection3").hide();
    $("#bar3").removeClass("active");
    $("#bar2").removeClass("active");
}

function makePieChart(toppingsSize){
    //https://developers.google.com/chart/interactive/docs/gallery/piechart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable(toppingsSize);

        var options = {
            title: 'My Current Pizza Toppings'
        };

        var chart = new google.visualization.PieChart(document.getElementById('pieChart'));

        chart.draw(data, options);
    }
}

function makeSankeyCharts(sankeyData){
    //https://developers.google.com/chart/interactive/docs/gallery/sankey
    google.charts.load('current', {'packages':['sankey']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Frequency');
        data.addRows(sankeyData);

        var options = {
            width: 300,
        };

        var chart = new google.visualization.Sankey(document.getElementById('sankeyChart'));
        chart.draw(data, options);
    }
}
