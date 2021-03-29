/* TRANSLATE ELEMENTS */
if (typeof Resources == "undefined") Resources = { Resource: {} };
Resources._ = function (val, params) {
    var ret = Resources.Resource[val] || val;
    ret = ret.replace("xxx", params);
    return ret;
};
