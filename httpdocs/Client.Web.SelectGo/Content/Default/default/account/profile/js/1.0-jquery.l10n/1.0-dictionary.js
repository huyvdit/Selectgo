const words = {

    vi: {
        

    },
    en: {
        "And": "and.",

    }
};
if (words[AppConfigs.UniqueSeoCode] == undefined) {
    words[AppConfigs.UniqueSeoCode] = {};
}
for (var k in window['L10n_Words']) {
    words[AppConfigs.UniqueSeoCode][k] = window['L10n_Words'][k];
}

