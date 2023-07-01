var HMotion = function (objName) {
  (this.objName = objName),
    this.workobj,
    (this.workflag = !1),
    this.destx,
    this.desty,
    (this.before_zindex = ""),
    (this.objlist = []),
    this.prevsetx,
    this.prevsety,
    (this.count = 0);
  var frame = 14,
    firstflag = !0,
    movepointsX = [],
    movepointsY = [],
    movepointsW = [],
    movepointsH = [];
  (this.MoveTo = function (
    obj,
    destx,
    desty,
    destw,
    desth,
    myx,
    myy,
    myw,
    myh,
    pendfunc,
    is_percent
  ) {
    if (!this.workflag || this.workobj == obj) {
      if (((workflag = !0), (workobj = obj), firstflag)) {
        (firstflag = !1),
          (this.count = 0),
          (this.before_zindex = obj.style.zIndex),
          (obj.style.zIndex = 1e4),
          (movepointsX = []),
          (movepointsY = []),
          (movepointsW = []),
          (movepointsH = []),
          null == myx && (myx = this.getElementAbsPosX(obj)),
          null == myy && (myy = this.getElementAbsPosY(obj)),
          null == myw && (myw = obj.offsetWidth),
          null == myh && (myw = obj.offsetWidth),
          null == destx && (destx = this.getElementAbsPosX(obj)),
          null == desty && (desty = this.getElementAbsPosY(obj)),
          null == destw && (destw = obj.offsetWidth),
          null == desth && (desth = obj.offsetHeight);
        var log = "myw : " + myw + ", destw : " + destw + "\n",
          distx = destx - myx,
          disty = desty - myy,
          distw = destw - myw,
          disth = desth - myh;
        log += "myw : " + myw + ", destw : " + destw + "\n";
        for (var i = 1; i <= frame; i++)
          (movepointsX[i - 1] =
            myx + Math.floor(distx * Math.sin(((Math.PI / 2) * i) / frame))),
            (movepointsY[i - 1] =
              myy + Math.floor(disty * Math.sin(((Math.PI / 2) * i) / frame))),
            (movepointsW[i - 1] =
              myw + Math.floor(distw * Math.sin(((Math.PI / 2) * i) / frame))),
            (movepointsH[i - 1] =
              myh + Math.floor(disth * Math.sin(((Math.PI / 2) * i) / frame))),
            (log += ", " + movepointsW[i - 1]);
      }
      if (
        ((is_percent =
          null != is_percent && is_percent && "px" != is_percent ? "%" : "px"),
        this.count < movepointsX.length)
      ) {
        (obj.style.left = movepointsX[this.count] + "px"),
          (obj.style.top = movepointsY[this.count] + "px"),
          (obj.style.width = movepointsW[this.count] + is_percent),
          (obj.style.height = movepointsH[this.count] + "px"),
          this.count++,
          setTimeout(
            this.objName +
              '.MoveTo(document.getElementById("' +
              obj.id +
              '"), ' +
              destx +
              ", " +
              desty +
              ", " +
              destw +
              ", " +
              desth +
              ", " +
              myx +
              ", " +
              myy +
              ", " +
              myw +
              ", " +
              myh +
              ', "' +
              pendfunc +
              '", "' +
              is_percent +
              '")',
            20
          );
        return;
      }
      (firstflag = !0),
        (obj.style.zIndex = this.before_zindex),
        pendfunc && eval(pendfunc),
        (this.workflag = !1);
      return;
    }
  }),
    (this.SetTo = function (t, e, s) {
      (t.style.position = "absolute"),
        (t.style.top = s + "px"),
        (t.style.left = e + "px");
    }),
    (this.SetAbsolute = function (t) {
      var e = this.getElementAbsPosX(t),
        s = this.getElementAbsPosY(t);
      (t.style.position = "absolute"),
        (t.style.top = s + "px"),
        (t.style.left = e + "px");
    }),
    (this.SetRelative = function (t) {
      t.style.position = "relative";
    }),
    (this.getElementAbsPosX = function (t) {
      var e = 0;
      if (t.offsetParent)
        for (e = t.offsetLeft; (t = t.offsetParent); ) e += t.offsetLeft;
      return e;
    }),
    (this.getElementAbsPosY = function (t) {
      var e = 0;
      if (t.offsetParent)
        for (e = t.offsetTop; (t = t.offsetParent); ) e += t.offsetTop;
      return e;
    }),
    (this.myTest = function (t) {
      document.getElementById("test").innerHTML = t;
    });
};
