var Janggi = {
    Gung: { No: 1, Score: 2e4 },
    Cha: { No: 2, Score: 1e3 },
    Sang: { No: 3, Score: 450 },
    Ma: { No: 4, Score: 700 },
    Sa: { No: 5, Score: 600 },
    Po: { No: 6, Score: 850 },
    Jole: { No: 7, Score: 400 },
    User: 1,
    Computer: 2,
  },
  Point = function (t, i) {
    (this.x = t), (this.y = i);
  },
  JanggiStage = function (objName, stage_id, han_eatitems, cho_eatitems) {
    function addEvent(t, i, n) {
      t.addEventListener
        ? t.addEventListener(i, n, !1)
        : t.attachEvent && t.attachEvent("on" + i, n);
    }
    function set_opacity(t, i) {
      (t.style.opacity = i / 100),
        (t.style.MozOpacity = i / 100),
        (t.style.KhtmlOpacity = i / 100),
        (t.style.filter = "alpha(opacity=" + i + ")");
    }
    function mytest(t) {}
    function get_stage_score(t, i) {
      for (var n = 0, e = 0; e < 9; e++)
        for (var s = 0; s < 10; s++)
          null != t[e][s] &&
            t[e][s].junit_obj.team == i &&
            ((n += t[e][s].junit_obj.score),
            t[e][s].junit_obj.kind == Janggi.Po &&
              ((i == Janggi.User && s >= 7 && e >= 3 && e <= 5) ||
                (i == Janggi.Computer && s <= 2 && e >= 3 && e <= 5)) &&
              ((n += 30),
              ((i == Janggi.User && 7 == s && 4 == e) ||
                (i == Janggi.Computer && 2 == s && 4 == e)) &&
                (n += 10)));
      return (
        i == Janggi.User
          ? null != t[4][8] && t[4][8].junit_obj.kind == Janggi.Gung
            ? ((n += 20),
              null != t[3][8] &&
                t[3][8].junit_obj.kind == Janggi.Sa &&
                (n += 10),
              null != t[5][8] &&
                t[5][8].junit_obj.kind == Janggi.Sa &&
                (n += 10),
              null != t[3][9] &&
                t[3][9].junit_obj.kind == Janggi.Sa &&
                (n += 10),
              null != t[5][9] &&
                t[5][9].junit_obj.kind == Janggi.Sa &&
                (n += 10))
            : null != t[4][9] &&
              t[4][9].junit_obj.kind == Janggi.Gung &&
              ((n += 80),
              null != t[4][8] &&
                t[4][8].junit_obj.kind == Janggi.Sa &&
                (n += 13),
              null != t[3][8] &&
                t[3][8].junit_obj.kind == Janggi.Sa &&
                (n += 10),
              null != t[5][8] &&
                t[5][8].junit_obj.kind == Janggi.Sa &&
                (n += 10),
              null != t[3][9] &&
                t[3][9].junit_obj.kind == Janggi.Sa &&
                (n += 10),
              null != t[5][9] &&
                t[5][9].junit_obj.kind == Janggi.Sa &&
                (n += 10))
          : null != t[4][1] && t[4][1].junit_obj.kind == Janggi.Gung
          ? ((n += 20),
            null != t[3][1] && t[3][1].junit_obj.kind == Janggi.Sa && (n += 10),
            null != t[5][1] && t[5][1].junit_obj.kind == Janggi.Sa && (n += 10),
            null != t[3][0] && t[3][0].junit_obj.kind == Janggi.Sa && (n += 10),
            null != t[5][0] && t[5][0].junit_obj.kind == Janggi.Sa && (n += 10))
          : null != t[4][0] &&
            t[4][0].junit_obj.kind == Janggi.Gung &&
            ((n += 8),
            null != t[4][1] && t[4][1].junit_obj.kind == Janggi.Sa && (n += 13),
            null != t[3][1] && t[3][1].junit_obj.kind == Janggi.Sa && (n += 10),
            null != t[5][1] && t[5][1].junit_obj.kind == Janggi.Sa && (n += 10),
            null != t[3][0] && t[3][0].junit_obj.kind == Janggi.Sa && (n += 10),
            null != t[5][0] &&
              t[5][0].junit_obj.kind == Janggi.Sa &&
              (n += 10)),
        n
      );
    }
    function get_max(t) {
      if (0 == t.length) return null;
      for (var i = null, n = 0; n < t.length; n++)
        (null == i || t[n] > i) && (i = t[n]);
      return i;
    }
    function get_min(t) {
      if (0 == t.length) return null;
      for (var i = null, n = 0; n < t.length; n++)
        (null == i || t[n] < i) && (i = t[n]);
      return i;
    }
    (this.objName = objName),
      (this.stage = document.getElementById(stage_id)),
      (this.width = parseInt(stage.style.width.split("px")[0])),
      (this.height = parseInt(stage.style.height.split("px")[0])),
      (this.x_term = this.width / 8),
      (this.y_term = this.height / 9),
      (this.units = []),
      (this.m_depth = 4),
      (this.tern = Janggi.User),
      (this.pos_divs = []),
      (this.pos_junit_obj = null),
      this.is_final,
      (this.com_tern = 0),
      (this.is_single = !0),
      (this.com_beforepos = document.createElement("div")),
      (this.com_beforepos.className = "position"),
      (this.com_beforepos.style.backgroundColor = "red"),
      (this.com_beforepos.style.display = "none"),
      set_opacity(this.com_beforepos, 30),
      (this.com_nowpos = document.createElement("div")),
      (this.com_nowpos.className = "position"),
      (this.com_nowpos.style.backgroundColor = "red"),
      (this.com_nowpos.style.display = "none"),
      (this.motion = new HMotion(this.objName + ".motion")),
      set_opacity(this.com_nowpos, 30),
      (this.han_eatitems_area = document.getElementById(han_eatitems)),
      (this.cho_eatitems_area = document.getElementById(cho_eatitems)),
      (this.init = function () {
        // 컴퓨터
        this.units.push(
          new Units(
            new JanggiUnit(this.x_term, this.y_term, 0, 0, Janggi.Cha),
            !0
          )
        ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 1, 0, Janggi.Sang),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 2, 0, Janggi.Ma),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 3, 0, Janggi.Sa),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 5, 0, Janggi.Sa),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 6, 0, Janggi.Sang),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 7, 0, Janggi.Ma),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 8, 0, Janggi.Cha),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 4, 1, Janggi.Gung),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 1, 2, Janggi.Po),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 7, 2, Janggi.Po),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 0, 3, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 2, 3, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 4, 3, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 6, 3, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 8, 3, Janggi.Jole),
              !0
            )
          ),
          // user
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 0, 6, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 2, 6, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 4, 6, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 6, 6, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 8, 6, Janggi.Jole),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 1, 7, Janggi.Po),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 7, 7, Janggi.Po),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 4, 8, Janggi.Gung),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 0, 9, Janggi.Cha),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 1, 9, Janggi.Ma),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 2, 9, Janggi.Sang),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 3, 9, Janggi.Sa),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 5, 9, Janggi.Sa),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 6, 9, Janggi.Sang),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 7, 9, Janggi.Ma),
              !0
            )
          ),
          this.units.push(
            new Units(
              new JanggiUnit(this.x_term, this.y_term, 8, 9, Janggi.Cha),
              !0
            )
          );
        for (var i = 0; i < this.units.length; i++)
          this.stage.appendChild(this.units[i].junit_obj.obj),
            eval(
              "addEvent(this.units[i].junit_obj.obj, 'click', function(){" +
                this.objName +
                ".showPos(" +
                this.objName +
                ".units[" +
                i +
                "].junit_obj);});"
            );
        this.stage.appendChild(this.com_beforepos),
          this.stage.appendChild(this.com_nowpos);
      }),
      (this.showComBeforePos = function (t, i, n, e) {
        (this.com_beforepos.style.left = t * this.x_term + "px"),
          (this.com_beforepos.style.top = i * this.y_term + "px"),
          (this.com_beforepos.style.display = "block"),
          (this.com_nowpos.style.left = n * this.x_term + "px"),
          (this.com_nowpos.style.top = e * this.y_term + "px"),
          (this.com_nowpos.style.display = "block");
      }),
      (this.showPos = function (junit_obj) {
        if (
          ((this.com_beforepos.style.display = "none"),
          (this.com_nowpos.style.display = "none"),
          !0 != this.is_final &&
            this.tern == junit_obj.team &&
            (!0 != this.is_single || !0 != junit_obj.is_computer))
        ) {
          if (junit_obj == this.pos_junit_obj) {
            this.removePosition();
            return;
          }
          this.removePosition();
          for (
            var poses = junit_obj.getMoveablePos(this.getStageStatus()), i = 0;
            i < poses.length;
            i++
          ) {
            var div = document.createElement("div");
            (div.className = "position"),
              (div.style.left = poses[i].x * this.x_term + "px"),
              (div.style.top = poses[i].y * this.y_term + "px"),
              eval(
                "addEvent(div, 'click', function(){" +
                  this.objName +
                  ".ChangeUnit(" +
                  junit_obj.axis_x +
                  ", " +
                  junit_obj.axis_y +
                  ", " +
                  poses[i].x +
                  ", " +
                  poses[i].y +
                  ");})"
              ),
              set_opacity(div, 80),
              this.pos_divs.push(div),
              this.stage.appendChild(div);
          }
          this.pos_junit_obj = junit_obj;
        }
      }),
      (this.removePosition = function () {
        if (this.pos_divs.length <= 0) return !1;
        for (var t = 0; t < this.pos_divs.length; t++)
          this.pos_divs[t].parentNode.removeChild(this.pos_divs[t]);
        return (this.pos_divs = []), (this.pos_junit_obj = null), !0;
      }),
      (this.ChangeUnit = function (t, i, n, e, s) {
        var a = this.getStageStatus();
        a[t][i];
        var u = a[t][i].junit_obj;
        if (null == s) {
          u.MoveMotion(n, e, this.motion, [t, i, n, e]);
          return;
        }
        if ((u.Move(n, e), this.removePosition(), null != a[n][e])) {
          (a[n][e].is_valid = !1),
            (a[n][e].junit_obj.obj.style.display = "none");
          var o =
            this.tern == Janggi.User
              ? this.cho_eatitems_area
              : this.han_eatitems_area;
          if (o) {
            "relative" != o.style.position && (o.style.position = "relative");
            var h = document.createElement("div");
            (h.className = a[n][e].junit_obj.obj.className),
              (h.innerHTML = a[n][e].junit_obj.obj.innerHTML);
            var l = o.children.length,
              g = (l % 8) * this.x_term,
              r = parseInt(l / 8) * this.y_term;
            (h.style.left = g + "px"),
              (h.style.top = r + "px"),
              (h.style.margin = "0px"),
              o.appendChild(h);
          }
          if (a[n][e].junit_obj.kind == Janggi.Gung) {
            this.doGameOver(a[n][e].junit_obj.team == Janggi.User);
            return;
          }
        }
        u.kind != Janggi.Gung && this.checkJanggun(),
          !0 == u.is_computer
            ? (this.showComBeforePos(t, i, n, e), (this.tern = Janggi.User))
            : ((this.tern = Janggi.Computer),
              !0 == this.is_single &&
                this.doMinimax(this.getStageStatus(), this.m_depth, null));
      }),
      (this.checkJanggun = function () {
        var t = this.getStageStatus(),
          i = this.tern == Janggi.User ? Janggi.Computer : Janggi.User,
          n = null,
          e = 0;
        i == Janggi.User && (e += 7);
        for (var s = e + 2, a = 3; a <= 5; a++)
          for (var u = e; u <= s; u++)
            if (null != t[a][u] && t[a][u].junit_obj.kind == Janggi.Gung) {
              (n = new Point(a, u)), (a = 5);
              break;
            }
        if (null != n) {
          for (var a = 0; a < 9; a++)
            for (var u = 0; u < 10; u++)
              if (null != t[a][u] && t[a][u].junit_obj.team == this.tern) {
                for (
                  var o = t[a][u].junit_obj.getMoveablePos(t), h = 0;
                  h < o.length;
                  h++
                )
                  if (
                    null != t[o[h].x][o[h].y] &&
                    t[o[h].x][o[h].y].junit_obj.kind == Janggi.Gung
                  ) {
                    alert("장군!"), (a = 9), (u = 10);
                    break;
                  }
              }
        }
      }),
      (this.doGameOver = function (t) {
        alert(t ? "패! 좀 더 연습하세요" : "승!! 축하합니다"),
          (this.is_final = !0);
      }),
      (this.doMinimax = function (t, i, n) {
        if (
          (i == this.m_depth && (this.com_tern++, mytest(this.com_tern)),
          i == this.m_depth && this.com_tern < 6)
        ) {
          var e = [];
          if (
            (null != t[0][3] &&
              t[0][3].junit_obj.team == Janggi.Computer &&
              t[0][3].junit_obj.kind == Janggi.Jole &&
              null != t[0][6] &&
              t[0][6].junit_obj.team == Janggi.User &&
              t[0][6].junit_obj.kind == Janggi.Jole &&
              e.push([0, 3, 1, 3]),
            null != t[8][3] &&
              t[8][3].junit_obj.team == Janggi.Computer &&
              t[8][3].junit_obj.kind == Janggi.Jole &&
              null != t[8][6] &&
              t[8][6].junit_obj.team == Janggi.User &&
              t[8][6].junit_obj.kind == Janggi.Jole &&
              e.push([8, 3, 7, 3]),
            null != t[0][3] && null != t[8][3] && e.length > 0)
          ) {
            var s = e[parseInt(Math.random() * e.length)];
            this.ChangeUnit(s[0], s[1], s[2], s[3]);
            return;
          }
          var e = [];
          if (
            null == t[4][2] &&
            null != t[4][3] &&
            t[4][3].junit_obj.team == Janggi.Computer &&
            !1 ==
              ((null != t[0][3] && t[0][3].junit_obj.team != Janggi.Computer) ||
                (null != t[8][3] &&
                  t[8][3].junit_obj.team != Janggi.Computer) ||
                (null == t[0][3] && null == t[0][6]) ||
                (null == t[8][3] && null == t[8][6]) ||
                (null != t[3][3] && t[3][3].junit_obj.kind == Janggi.Ma) ||
                (null != t[5][3] && t[5][3].junit_obj.kind == Janggi.Ma) ||
                (null != t[0][7] && t[0][7].junit_obj.kind == Janggi.Po) ||
                (null != t[8][7] && t[8][7].junit_obj.kind == Janggi.Po) ||
                (null != t[4][7] &&
                  t[4][7].junit_obj.kind == Janggi.Po &&
                  null == t[4][6]) ||
                null == t[0][9] ||
                null == t[8][9])
          ) {
            for (var a = 0; a <= 8; a++)
              null != t[a][0] &&
                t[a][0].junit_obj.kind == Janggi.Ma &&
                e.push([a, 0, a < 4 ? a + 1 : a - 1, 2]);
            if (2 == e.length) {
              var s = e[parseInt((100 * Math.random()) % e.length)];
              this.ChangeUnit(s[0], s[1], s[2], s[3]);
              return;
            }
            if (1 == e.length) {
              var u = e[0][0] > 4 ? 1 : 7;
              this.ChangeUnit(u, 2, 4, 2);
              return;
            }
          }
        }
        i--;
        for (
          var o = (this.m_depth - 1) % 2,
            h = (o + 1) % 2,
            l = i % 2,
            g = l == o ? Janggi.Computer : Janggi.User,
            r = null,
            m = null,
            _ = 0,
            j = 0;
          j < 9;
          j++
        )
          for (var p = 0; p < 10; p++)
            if (null != t[j][p] && t[j][p].junit_obj.team == g) {
              var b = t[j][p].junit_obj.getMoveablePos(t);
              _ += b.length;
              for (var a = 0; a < b.length; a++) {
                var $ = [j, p, b[a].x, b[a].y];
                if (
                  null != t[b[a].x][b[a].y] &&
                  t[b[a].x][b[a].y].junit_obj.team != t[j][p].junit_obj.team &&
                  t[b[a].x][b[a].y].junit_obj.kind == Janggi.Gung
                ) {
                  (r = -1e5), l == o && (r = 1e5), (m = $), (j = 9), (p = 10);
                  break;
                }
                var c = this.getChangeStageStatus(t, j, p, b[a].x, b[a].y),
                  w = c[b[a].x][b[a].y],
                  $ = [j, p, b[a].x, b[a].y];
                if (
                  (i == this.m_depth - 1 &&
                    (mytest(
                      w.junit_obj.text + "Depth : " + i + " : " + $.join("-")
                    ),
                    mytest("================================")),
                  0 == i)
                ) {
                  var J =
                    get_stage_score(c, Janggi.Computer) -
                    get_stage_score(c, Janggi.User);
                  if (
                    (null == r || (l == h && r > J) || (l == o && r < J)) &&
                    ((r = J),
                    (null != n && l == h && r <= n) || (l == o && r >= n))
                  ) {
                    (j = 9), (p = 10);
                    break;
                  }
                  continue;
                }
                var J = this.doMinimax(c, i, r);
                if (
                  (null == r || (l == o && J > r) || (l == h && J < r)) &&
                  ((r = J),
                  (m = $),
                  null != n && ((l == o && r > n) || (l == h && r < n)))
                ) {
                  mytest(
                    "cut-dep:" +
                      i +
                      ", rtype : " +
                      l +
                      ", cut : " +
                      n +
                      ", sco : " +
                      r
                  ),
                    (j = 9),
                    (p = 10);
                  break;
                }
              }
            }
        if (i < this.m_depth - 1) return r;
        mytest(m[0] + ", " + m[1] + ", " + m[2] + ", " + m[3]),
          this.ChangeUnit(m[0], m[1], m[2], m[3]);
      }),
      (this.getStageStatus = function () {
        for (var t = [], i = 0; i < 9; i++) t[i] = [];
        for (var n = 0; n < this.units.length; n++)
          !1 != this.units[n].is_valid &&
            (t[this.units[n].junit_obj.axis_x][this.units[n].junit_obj.axis_y] =
              this.units[n]);
        return t;
      }),
      (this.getChangeStageStatus = function (t, i, n, e, s) {
        for (var a = [], u = 0; u < 9; u++) a[u] = [];
        for (var u = 0; u < 9; u++)
          for (var o = 0; o < 10; o++) a[u][o] = t[u][o];
        return (a[e][s] = a[i][n]), (a[i][n] = null), a;
      });
  },
  JanggiUnit = function (x_term, y_term, axis_x, axis_y, janggi_kind) {
    switch (
      ((this.x_term = x_term),
      (this.y_term = y_term),
      (this.axis_x = axis_x),
      (this.axis_y = axis_y),
      (this.px_x = axis_x * x_term),
      (this.px_y = axis_y * y_term),
      (this.is_computer = axis_y < 4),
      (this.kind = janggi_kind),
      (this.score = janggi_kind.Score),
      (this.text = ""),
      (this.obj_className = "team_green "),
      (this.team = Janggi.User),
      !0 == this.is_computer &&
        ((this.obj_className = "team_red "), (this.team = Janggi.Computer)),
      janggi_kind)
    ) {
      case Janggi.Gung:
        (this.text = "楚"),
          !0 == this.is_computer && (this.text = "漢"),
          (this.obj_className += "item_big");
        break;
      case Janggi.Cha:
        (this.text = "車"), (this.obj_className += "item_normal");
        break;
      case Janggi.Sang:
        (this.text = "象"), (this.obj_className += "item_normal");
        break;
      case Janggi.Ma:
        (this.text = "馬"), (this.obj_className += "item_normal");
        break;
      case Janggi.Sa:
        (this.text = "士"), (this.obj_className += "item_small");
        break;
      case Janggi.Po:
        (this.text = "包"), (this.obj_className += "item_normal");
        break;
      case Janggi.Jole:
        (this.text = "卒"),
          !0 == this.is_computer && (this.text = "兵"),
          (this.obj_className += "item_small");
    }
    (this.obj = document.createElement("div")),
      (this.obj.id = "janggi_" + this.axis_x + "_" + this.axis_y),
      (this.obj.className = this.obj_className),
      (this.obj.innerHTML = this.text),
      (this.obj.style.position = "absolute"),
      (this.obj.style.left = this.px_x + "px"),
      (this.obj.style.top = this.px_y + "px"),
      (this.MoveMotion = function (to_x, to_y, motion, after_params) {
        var mpx = this.px_x,
          mpy = this.px_y,
          dpx = to_x * this.x_term,
          dpy = to_y * this.y_term,
          parentObjName = motion.objName.split(".")[0];
        eval("var parentObj = " + parentObjName + ";");
        var finish_script =
          parentObjName +
          ".ChangeUnit(" +
          parseInt(after_params[0]) +
          "," +
          parseInt(after_params[1]) +
          "," +
          parseInt(after_params[2]) +
          "," +
          parseInt(after_params[3]) +
          ",true);";
        eval("var stage = " + parentObjName + ".getStageStatus();");
        var eat_item = stage[after_params[2]][after_params[3]];
        if (null != eat_item && eat_item.junit_obj.team != this.team) {
          var eatitem_dest_y =
            this.team == Janggi.User
              ? parseInt(parentObj.height) + parseInt(this.y_term)
              : -1 * this.y_term;
          finish_script =
            parentObjName +
            ".motion.MoveTo(document.getElementById('" +
            eat_item.junit_obj.obj.id +
            "'), " +
            dpx +
            ", " +
            eatitem_dest_y +
            ", null, null, " +
            dpx +
            ", " +
            dpy +
            ", null, null, '" +
            finish_script +
            "', false);";
        }
        motion.MoveTo(
          this.obj,
          dpx,
          dpy,
          null,
          null,
          mpx,
          mpy,
          null,
          null,
          finish_script,
          !1
        );
      }),
      (this.Move = function (t, i) {
        (this.axis_x = t),
          (this.axis_y = i),
          (this.px_x = this.axis_x * this.x_term),
          (this.px_y = this.axis_y * this.y_term),
          (this.obj.style.left = this.px_x + "px"),
          (this.obj.style.top = this.px_y + "px");
      }),
      (this.getAddScore = function (t) {
        for (var i = 0, n = this.getMoveablePos(t), e = 0; e < n.length; e++)
          null != t[n[e].x][n[e].y] &&
            t[n[e].x][n[e].y].junit_obj.team != this.team &&
            (i += t[n[e].x][n[e].y].junit_obj.score / 100);
        return i;
      }),
      (this.getMoveablePos = function (t) {
        for (var i = this.axis_x, n = this.axis_y, e = 0; e <= 8; e++)
          for (var s = 0; s <= 9; s++)
            if (t[e][s] == this) {
              (i = e), (n = s), (e = 8);
              break;
            }
        var a = [];
        switch (this.kind) {
          case Janggi.Cha:
            for (var u = i - 1; u >= 0; u--) {
              if (null == t[u][n]) {
                a.push(new Point(u, n));
                continue;
              }
              t[u][n].junit_obj.team != this.team && a.push(new Point(u, n));
              break;
            }
            for (var u = i + 1; u <= 8; u++) {
              if (null == t[u][n]) {
                a.push(new Point(u, n));
                continue;
              }
              t[u][n].junit_obj.team != this.team && a.push(new Point(u, n));
              break;
            }
            for (var u = n - 1; u >= 0; u--) {
              if (null == t[i][u]) {
                a.push(new Point(i, u));
                continue;
              }
              t[i][u].junit_obj.team != this.team && a.push(new Point(i, u));
              break;
            }
            for (var u = n + 1; u <= 9; u++) {
              if (null == t[i][u]) {
                a.push(new Point(i, u));
                continue;
              }
              t[i][u].junit_obj.team != this.team && a.push(new Point(i, u));
              break;
            }
            if (n < 3) {
              if (i - n == 3)
                switch (n) {
                  case 0:
                    (null == t[i + 1][n + 1] ||
                      t[i + 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n + 1)),
                      null == t[i + 1][n + 1] &&
                        (null == t[i + 2][n + 2] ||
                          t[i + 2][n + 2].junit_obj.team != this.team) &&
                        a.push(new Point(i + 2, n + 2));
                    break;
                  case 1:
                    (null == t[i + 1][n + 1] ||
                      t[i + 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n + 1)),
                      (null == t[i - 1][n - 1] ||
                        t[i - 1][n - 1].junit_obj.team != this.team) &&
                        a.push(new Point(i - 1, n - 1));
                    break;
                  case 2:
                    (null == t[i - 1][n - 1] ||
                      t[i - 1][n - 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n - 1)),
                      null == t[i - 1][n - 1] &&
                        (null == t[i - 2][n - 2] ||
                          t[i - 2][n - 2].junit_obj.team != this.team) &&
                        a.push(new Point(i - 2, n - 2));
                }
              if (i + n == 5)
                switch (n) {
                  case 0:
                    (null == t[i - 1][n + 1] ||
                      t[i - 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n + 1)),
                      null == t[i - 1][n + 1] &&
                        (null == t[i - 2][n + 2] ||
                          t[i - 2][n + 2].junit_obj.team != this.team) &&
                        a.push(new Point(i - 2, n + 2));
                    break;
                  case 1:
                    (null == t[i - 1][n + 1] ||
                      t[i - 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n + 1)),
                      (null == t[i + 1][n - 1] ||
                        t[i + 1][n - 1].junit_obj.team != this.team) &&
                        a.push(new Point(i + 1, n - 1));
                    break;
                  case 2:
                    (null == t[i + 1][n - 1] ||
                      t[i + 1][n - 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n - 1)),
                      null == t[i + 1][n - 1] &&
                        (null == t[i + 2][n - 2] ||
                          t[i + 2][n - 2].junit_obj.team != this.team) &&
                        a.push(new Point(i + 2, n - 2));
                }
            } else if (n > 6) {
              if (n - i == 4)
                switch (n) {
                  case 7:
                    (null == t[i + 1][n + 1] ||
                      t[i + 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n + 1)),
                      null == t[i + 1][n + 1] &&
                        (null == t[i + 2][n + 2] ||
                          t[i + 2][n + 2].junit_obj.team != this.team) &&
                        a.push(new Point(i + 2, n + 2));
                    break;
                  case 8:
                    (null == t[i + 1][n + 1] ||
                      t[i + 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n + 1)),
                      (null == t[i - 1][n - 1] ||
                        t[i - 1][n - 1].junit_obj.team != this.team) &&
                        a.push(new Point(i - 1, n - 1));
                    break;
                  case 9:
                    (null == t[i - 1][n - 1] ||
                      t[i - 1][n - 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n - 1)),
                      null == t[i - 1][n - 1] &&
                        (null == t[i - 2][n - 2] ||
                          t[i - 2][n - 2].junit_obj.team != this.team) &&
                        a.push(new Point(i - 2, n - 2));
                }
              if (i + n == 12)
                switch (n) {
                  case 7:
                    (null == t[i - 1][n + 1] ||
                      t[i - 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n + 1)),
                      null == t[i - 1][n + 1] &&
                        (null == t[i - 2][n + 2] ||
                          t[i - 2][n + 2].junit_obj.team != this.team) &&
                        a.push(new Point(i - 2, n + 2));
                    break;
                  case 8:
                    (null == t[i - 1][n + 1] ||
                      t[i - 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n + 1)),
                      (null == t[i + 1][n - 1] ||
                        t[i + 1][n - 1].junit_obj.team != this.team) &&
                        a.push(new Point(i + 1, n - 1));
                    break;
                  case 9:
                    (null == t[i + 1][n - 1] ||
                      t[i + 1][n - 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n - 1)),
                      null == t[i + 1][n - 1] &&
                        (null == t[i + 2][n - 2] ||
                          t[i + 2][n - 2].junit_obj.team != this.team) &&
                        a.push(new Point(i + 2, n - 2));
                }
            }
            return a;
          case Janggi.Gung:
          case Janggi.Sa:
            var o = [];
            if (
              (i > 3 && o.push(new Point(i - 1, n)),
              i < 5 && o.push(new Point(i + 1, n)),
              n < 3)
            ) {
              if (
                (n < 2 && o.push(new Point(i, n + 1)),
                n > 0 && o.push(new Point(i, n - 1)),
                i - n == 3)
              )
                switch (n) {
                  case 0:
                    o.push(new Point(i + 1, n + 1));
                    break;
                  case 1:
                    o.push(new Point(i + 1, n + 1)),
                      o.push(new Point(i - 1, n - 1));
                    break;
                  case 2:
                    o.push(new Point(i - 1, n - 1));
                }
              if (i + n == 5)
                switch (n) {
                  case 0:
                    o.push(new Point(i - 1, n + 1));
                    break;
                  case 1:
                    o.push(new Point(i - 1, n + 1)),
                      o.push(new Point(i + 1, n - 1));
                    break;
                  case 2:
                    o.push(new Point(i + 1, n - 1));
                }
            } else if (n > 6) {
              if (
                (n < 9 && o.push(new Point(i, n + 1)),
                n > 7 && o.push(new Point(i, n - 1)),
                n - i == 4)
              )
                switch (n) {
                  case 7:
                    o.push(new Point(i + 1, n + 1));
                    break;
                  case 8:
                    o.push(new Point(i + 1, n + 1)),
                      o.push(new Point(i - 1, n - 1));
                    break;
                  case 9:
                    o.push(new Point(i - 1, n - 1));
                }
              if (i + n == 12)
                switch (n) {
                  case 7:
                    o.push(new Point(i - 1, n + 1));
                    break;
                  case 8:
                    o.push(new Point(i - 1, n + 1)),
                      o.push(new Point(i + 1, n - 1));
                    break;
                  case 9:
                    o.push(new Point(i + 1, n - 1));
                }
            }
            for (var u = 0; u < o.length; u++)
              (null == t[o[u].x][o[u].y] ||
                t[o[u].x][o[u].y].junit_obj.team != this.team) &&
                a.push(o[u]);
            return a;
          case Janggi.Sang:
            return (
              n > 2 &&
                null == t[i][n - 1] &&
                (i > 1 &&
                  null == t[i - 1][n - 2] &&
                  (null == t[i - 2][n - 3] ||
                    t[i - 2][n - 3].junit_obj.team != this.team) &&
                  a.push(new Point(i - 2, n - 3)),
                i < 7 &&
                  null == t[i + 1][n - 2] &&
                  (null == t[i + 2][n - 3] ||
                    t[i + 2][n - 3].junit_obj.team != this.team) &&
                  a.push(new Point(i + 2, n - 3))),
              n < 7 &&
                null == t[i][n + 1] &&
                (i > 1 &&
                  null == t[i - 1][n + 2] &&
                  (null == t[i - 2][n + 3] ||
                    t[i - 2][n + 3].junit_obj.team != this.team) &&
                  a.push(new Point(i - 2, n + 3)),
                i < 7 &&
                  null == t[i + 1][n + 2] &&
                  (null == t[i + 2][n + 3] ||
                    t[i + 2][n + 3].junit_obj.team != this.team) &&
                  a.push(new Point(i + 2, n + 3))),
              i > 2 &&
                null == t[i - 1][n] &&
                (n > 1 &&
                  null == t[i - 2][n - 1] &&
                  (null == t[i - 3][n - 2] ||
                    t[i - 3][n - 2].junit_obj.team != this.team) &&
                  a.push(new Point(i - 3, n - 2)),
                n < 8 &&
                  null == t[i - 2][n + 1] &&
                  (null == t[i - 3][n + 2] ||
                    t[i - 3][n + 2].junit_obj.team != this.team) &&
                  a.push(new Point(i - 3, n + 2))),
              i < 6 &&
                null == t[i + 1][n] &&
                (n > 0 &&
                  null == t[i + 2][n - 1] &&
                  (null == t[i + 3][n - 2] ||
                    t[i + 3][n - 2].junit_obj.team != this.team) &&
                  a.push(new Point(i + 3, n - 2)),
                n < 9 &&
                  null == t[i + 2][n + 1] &&
                  (null == t[i + 3][n + 2] ||
                    t[i + 3][n + 2].junit_obj.team != this.team) &&
                  a.push(new Point(i + 3, n + 2))),
              a
            );
          case Janggi.Ma:
            return (
              n > 1 &&
                null == t[i][n - 1] &&
                (i > 0 &&
                  (null == t[i - 1][n - 2] ||
                    t[i - 1][n - 2].junit_obj.team != this.team) &&
                  a.push(new Point(i - 1, n - 2)),
                i < 8 &&
                  (null == t[i + 1][n - 2] ||
                    t[i + 1][n - 2].junit_obj.team != this.team) &&
                  a.push(new Point(i + 1, n - 2))),
              n < 8 &&
                null == t[i][n + 1] &&
                (i > 0 &&
                  (null == t[i - 1][n + 2] ||
                    t[i - 1][n + 2].junit_obj.team != this.team) &&
                  a.push(new Point(i - 1, n + 2)),
                i < 8 &&
                  (null == t[i + 1][n + 2] ||
                    t[i + 1][n + 2].junit_obj.team != this.team) &&
                  a.push(new Point(i + 1, n + 2))),
              i > 1 &&
                null == t[i - 1][n] &&
                (n > 0 &&
                  (null == t[i - 2][n - 1] ||
                    t[i - 2][n - 1].junit_obj.team != this.team) &&
                  a.push(new Point(i - 2, n - 1)),
                n < 9 &&
                  (null == t[i - 2][n + 1] ||
                    t[i - 2][n + 1].junit_obj.team != this.team) &&
                  a.push(new Point(i - 2, n + 1))),
              i < 7 &&
                null == t[i + 1][n] &&
                (n > 0 &&
                  (null == t[i + 2][n - 1] ||
                    t[i + 2][n - 1].junit_obj.team != this.team) &&
                  a.push(new Point(i + 2, n - 1)),
                n < 9 &&
                  (null == t[i + 2][n + 1] ||
                    t[i + 2][n + 1].junit_obj.team != this.team) &&
                  a.push(new Point(i + 2, n + 1))),
              a
            );
          case Janggi.Po:
            if (i > 1)
              for (var h = !1, u = i - 1; u >= 0; u--) {
                if (!1 == h) {
                  if (null != t[u][n]) {
                    if (t[u][n].junit_obj.kind == Janggi.Po) break;
                    h = !0;
                  }
                  continue;
                }
                if (null == t[u][n]) a.push(new Point(u, n));
                else {
                  t[u][n].junit_obj.kind != Janggi.Po &&
                    t[u][n].junit_obj.team != this.team &&
                    a.push(new Point(u, n));
                  break;
                }
              }
            if (i < 7)
              for (var h = !1, u = i + 1; u <= 8; u++) {
                if (!1 == h) {
                  if (null != t[u][n]) {
                    if (t[u][n].junit_obj.kind == Janggi.Po) break;
                    h = !0;
                  }
                  continue;
                }
                if (null == t[u][n]) a.push(new Point(u, n));
                else {
                  t[u][n].junit_obj.kind != Janggi.Po &&
                    t[u][n].junit_obj.team != this.team &&
                    a.push(new Point(u, n));
                  break;
                }
              }
            if (n > 1)
              for (var h = !1, u = n - 1; u >= 0; u--) {
                if (!1 == h) {
                  if (null != t[i][u]) {
                    if (t[i][u].junit_obj.kind == Janggi.Po) break;
                    h = !0;
                  }
                  continue;
                }
                if (null == t[i][u]) a.push(new Point(i, u));
                else {
                  t[i][u].junit_obj.kind != Janggi.Po &&
                    t[i][u].junit_obj.team != this.team &&
                    a.push(new Point(i, u));
                  break;
                }
              }
            if (n < 8)
              for (var h = !1, u = n + 1; u <= 9; u++) {
                if (!1 == h) {
                  if (null != t[i][u]) {
                    if (t[i][u].junit_obj.kind == Janggi.Po) break;
                    h = !0;
                  }
                  continue;
                }
                if (null == t[i][u]) a.push(new Point(i, u));
                else {
                  t[i][u].junit_obj.kind != Janggi.Po &&
                    t[i][u].junit_obj.team != this.team &&
                    a.push(new Point(i, u));
                  break;
                }
              }
            if (n < 3) {
              if (i - n == 3)
                switch (n) {
                  case 0:
                    null != t[i + 1][n + 1] &&
                      (null == t[i + 2][n + 2] ||
                        t[i + 2][n + 2].junit_obj.team != this.team) &&
                      a.push(new Point(i + 2, n + 2));
                    break;
                  case 1:
                    break;
                  case 2:
                    null != t[i - 1][n - 1] &&
                      (null == t[i - 2][n - 2] ||
                        t[i - 2][n - 2].junit_obj.team != this.team) &&
                      a.push(new Point(i - 2, n - 2));
                }
              if (i + n == 5)
                switch (n) {
                  case 0:
                    null != t[i - 1][n + 1] &&
                      (null == t[i - 2][n + 2] ||
                        t[i - 2][n + 2].junit_obj.team != this.team) &&
                      a.push(new Point(i - 2, n + 2));
                    break;
                  case 1:
                    break;
                  case 2:
                    null != t[i + 1][n - 1] &&
                      (null == t[i + 2][n - 2] ||
                        t[i + 2][n - 2].junit_obj.team != this.team) &&
                      a.push(new Point(i + 2, n - 2));
                }
            } else if (n > 6) {
              if (n - i == 4)
                switch (n) {
                  case 7:
                    null != t[i + 1][n + 1] &&
                      (null == t[i + 2][n + 2] ||
                        t[i + 2][n + 2].junit_obj.team != this.team) &&
                      a.push(new Point(i + 2, n + 2));
                    break;
                  case 8:
                    break;
                  case 9:
                    null != t[i - 1][n - 1] &&
                      (null == t[i - 2][n - 2] ||
                        t[i - 2][n - 2].junit_obj.team != this.team) &&
                      a.push(new Point(i - 2, n - 2));
                }
              if (i + n == 12)
                switch (n) {
                  case 7:
                    null != t[i - 1][n + 1] &&
                      (null == t[i - 2][n + 2] ||
                        t[i - 2][n + 2].junit_obj.team != this.team) &&
                      a.push(new Point(i - 2, n + 2));
                    break;
                  case 8:
                    break;
                  case 9:
                    null != t[i + 1][n - 1] &&
                      (null == t[i + 2][n - 2] ||
                        t[i + 2][n - 2].junit_obj.team != this.team) &&
                      a.push(new Point(i + 2, n - 2));
                }
            }
            return a;
          case Janggi.Jole:
            if (
              (i > 0 &&
                (null == t[i - 1][n] ||
                  t[i - 1][n].junit_obj.is_computer != this.is_computer) &&
                a.push(new Point(i - 1, n)),
              i < 8 &&
                (null == t[i + 1][n] ||
                  t[i + 1][n].junit_obj.is_computer != this.is_computer) &&
                a.push(new Point(i + 1, n)),
              this.is_computer
                ? n < 9 &&
                  (null == t[i][n + 1] ||
                    t[i][n + 1].junit_obj.is_computer != this.is_computer) &&
                  a.push(new Point(i, n + 1))
                : n > 0 &&
                  (null == t[i][n - 1] ||
                    t[i][n - 1].junit_obj.is_computer != this.is_computer) &&
                  a.push(new Point(i, n - 1)),
              n < 3)
            ) {
              if (i - n == 3)
                switch (n) {
                  case 0:
                    break;
                  case 1:
                  case 2:
                    (null == t[i - 1][n - 1] ||
                      t[i - 1][n - 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n - 1));
                }
              if (i + n == 5)
                switch (n) {
                  case 0:
                    break;
                  case 1:
                  case 2:
                    (null == t[i + 1][n - 1] ||
                      t[i + 1][n - 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n - 1));
                }
            } else if (n > 6) {
              if (n - i == 4)
                switch (n) {
                  case 7:
                  case 8:
                    (null == t[i + 1][n + 1] ||
                      t[i + 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i + 1, n + 1));
                }
              if (i + n == 12)
                switch (n) {
                  case 7:
                  case 8:
                    (null == t[i - 1][n + 1] ||
                      t[i - 1][n + 1].junit_obj.team != this.team) &&
                      a.push(new Point(i - 1, n + 1));
                }
            }
            return a;
        }
      });
  },
  Units = function (t, i) {
    (this.junit_obj = t), (this.is_valid = i);
  };
