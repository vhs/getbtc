/*
Author  : ThomasV
Licence : GPL v3
Support : 12oabCifvHuxzXtYVGhkxVfWZDvKcU743s
*/

function getElementsByClassName(oElm, strTagName, strClassName) {
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement; 
    for( var i=0; i< arrElements.length; i++ ) {
        oElement = arrElements[i];
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements);
}


/*  A timestamp is added to the url, to prevent cache effects */
function add_xc_script(){
    var timestamp = new Date().getTime(); 
    var request_url = "http://meme.hackspace.ca/bitcoin_rate.js?h="+timestamp;
    var scriptObj = document.createElement("script");
    scriptObj.setAttribute("type", "text/javascript");
    scriptObj.setAttribute("src", request_url);
    scriptObj.setAttribute("id", "xc");
    var headLoc = document.getElementsByTagName("head").item(0);
    headLoc.appendChild(scriptObj);
}


function bitcoin_converter_callback( ) {

  var c = getElementsByClassName(document,"span","usd_to_btc");
  for(var i=0; i<c.length; i++) {
    address = c[i].title;
    var pstr = c[i].innerHTML.split(" ");
    var usd_price = parseFloat(pstr[0]);
    var add_unit = false;
    if(pstr.length>1) { 
        if( pstr[1]=="USD") {
           add_unit = true;
        } else {
	   alert("error");
           return;
        }
    }
    var price = Math.round(100*usd_price/self.btc_usd)/100.;
    var price_u = "" + price;
    if(add_unit) price_u = price_u + " BTC";
    if(address) {
       price_u = "<a href='javascript:show_bitcoin_address("+price+",\""+address+"\");'>" + price_u + "</a>";
    }
    c[i].innerHTML = price_u ;
    c[i].title = usd_price + " USD";
  }

  var c = getElementsByClassName(document,"span","btc_to_usd");
  for(var i=0; i<c.length; i++) {
    address = c[i].title;
    var pstr = c[i].innerHTML.split(" ");
    var btc_price = parseFloat(pstr[0]);
    var add_unit = false;
    if(pstr.length>1) { 
        if( pstr[1]=="BTC") {
           add_unit = true;
        } else {
           alert("error");
           return;
        }
    }
    var price = btc_price*self.btc_usd;
    if(price < 1) precision = 1000.; else precision = 100.; 
    price = Math.round(precision*price)/precision;
    var price_u = "" + price;
    if(add_unit) price_u = price_u + " USD";
    if(address) {
       price_u = "<a href='javascript:show_bitcoin_address("+price+",\""+address+"\");'>" + price_u + "</a>";
    }
    c[i].innerHTML = price_u ;
    c[i].title = btc_price + " BTC";
  }


}

function show_bitcoin_address(amount, address){
  alert("This item can be purchased with Bitcoins.\nPrice: "+amount+" Bitcoins\nAddress: "+address+"\n\nVisit http://www.bitcoin.org for more information.");
}

/* change this if you use addLoadEvent */
window.onload = add_xc_script;
