function saveSVG(dest) {
    var exportOptions = new ExportOptionsSVG();

    var type = ExportType.SVG;

    var fileSpec = new File(dest);

    exportOptions.embedRasterImages = true;

    exportOptions.embedAllFonts = true;

    exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}

function changePathName(pathItems, search_string, replace_string){

    var counter = 0

    for (i = 0; i < pathItems.length; i++) {
        var pathName = pathItems[i].name;
        // if (pathName.indexOf("elm") >= 0){
        if (pathName.indexOf(search_string) >= 0) {
            var replace_name = pathName.replace(search_string, replace_string)
            // alert(replace_name)
            pathItems[i].name = replace_name;
            counter += 1
        }
    }

    return counter;

}

function changeLayerName(pathnameChanges) {
    var allDocs = app.documents;
    var counter = 0
    for (var docIndex = 0; docIndex < allDocs.length; docIndex++) {
        allDocs[docIndex].activate();

        var doc = app.activeDocument;

        var pathItems = doc.pathItems;

        for (var search in pathnameChanges){
            var changesCount = changePathName(pathItems, search, pathnameChanges[search])
            // alert(search, pathnameChanges[search], "changes")
            counter += changesCount
        }
        
        // var changes = changePathName(pathItems, search_string, replace_string)

        // for (i = 0; i < pathItems.length; i++) {
        //     var pathName = pathItems[i].name;
        //     // if (pathName.indexOf("elm") >= 0){
        //     if (pathName.indexOf(search_string) >= 0) {
        //         var replace_name = pathName.replace(search_string, replace_string)
        //         alert(replace_name)
        //         pathItems[i].name = replace_name;
        //         counter += 1
        //     }
        // }

        var file_path = allDocs[docIndex].path + '/svg_output'
        // alert(file_path)
        saveSVG(file_path)

        allDocs[docIndex].save()


        // for (i = 0; i < pathItems.length; i++) {
        //     // search apeeter: elm([0-9]{1,3})\s
        //     var search_pattern = /elm([0-9]{1,3})\s/;
        //     var pathName = pathItems[i].name;
        //     // alert(pathName)
        //     // var patternMatch = search_pattern.test(pathName);
        //     // alert(replace_text)
        //     // if (patternMatch) {
        //     //     var replace_text = pathName.replace(search_pattern, "ele$1 ")

        //     //     // counter += 1
        //     // }
        // }

    }

    alert(counter + ' changes were made');
    return counter;
}

function start() {
    // var choice;
    // var w = new Window("dialog");
    // var g = w.add("group");
    // var a = g.add("radiobutton", undefined, "Active Document");
    // var b = g.add("radiobutton", undefined, "All Documents");
    // var button = w.add("button", undefined, "OK");
    // var radiobuttons = [a, b];
    // for (var i = 0; i < radiobuttons.length; i++) {
    //     (function (i) {
    //         radiobuttons[i].onClick = function () {
    //             choice = radiobuttons[i].text;
    //         };
    //     })(i);
    // }
    // w.show();


    var search_string = Window.prompt('Enter Search string', 'text 1', 'Find/Replace Layer Names');

    if (search_string == null) {
        alert('Cancelled by user');
        return;
    }

    var replace_string = Window.prompt('Enter Replace string', 'text 2', 'Find/Replace Layer Names');

    if (replace_string == null) {
        alert('Cancelled by user');
        return;
    }

    var folder = Folder.selectDialog();

    changeLayerName(search_string, replace_string)
}

if (BridgeTalk.appName == "illustrator") {
    alert("Hello")
    // start()
    var changes = {"elm":"ele", "Logo":"logo"}
    changeLayerName(changes)

    // var allDocs = app.documents;
    // alert(allDocs.length)

}
