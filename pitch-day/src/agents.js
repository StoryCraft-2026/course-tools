
 ! function() {
  var e = document.getElementById("apd-root");
  if (e) {
   var t = {
     pitch: "XYZ",
     feedback: "XYZ",
     qletter: "XYZ",
     pages: "XYZ",
     panel: "XYZ"
    },
    a = "2149787572",
    n = [{
     id: "d1",
     iso: "2027-05-14"
    }, {
     id: "d2",
     iso: "2027-05-15"
    }, {
     id: "d3",
     iso: "2027-06-11"
    }, {
     id: "d4",
     iso: "2027-06-12"
    }, {
     id: "d5",
     iso: "2027-10-15"
    }, {
     id: "d6",
     iso: "2027-10-16"
    }, {
     id: "d7",
     iso: "2027-11-12"
    }, {
     id: "d8",
     iso: "2027-11-13"
    }],
    r = [
     ["p1", "Session 1", "11:30"],
     ["p2", "Session 2", "16:00"]
    ],
    o = function(e) {
     return document.getElementById(e)
    },
    i = "apd-agent-draft-v4",
    s = "apd-agent-profile-v2",
    c = {
     age: ["Picture Book", "Middle Grade", "Young Adult", "New Adult", "Adult"],
     fic: ["Fantasy", "Romantasy", "Science Fiction", "Speculative", "Horror", "Thriller", "Suspense", "Mystery", "Crime", "Romance", "Rom-Com", "Historical", "Literary", "Upmarket / Book Club", "Women's Fiction", "Contemporary", "Magical Realism", "Dark Academia", "Retellings", "Graphic Novel", "LGBTQ+"],
     nf: ["Memoir", "Narrative Nonfiction", "True Crime", "History", "Self-Help", "Business", "Health & Wellness", "Pop Culture", "Science"]
    },
    d = [
     ["How many pitches will I take?", "You set a cap on the form, anywhere from 1 to 30. Writers can only book inside the hours you open, and we never go over your cap."],
     ["Can I sign up for more than one day?", "Yes. Each Pitch Day runs on a Friday and a Saturday, and each day has its own tab with its own hours and pitch cap. Sign up for one day or all of them, and you're paid for every pitch you take. You can also add days or hours later: sign in to your Agent Portal with your StoryCraft account on any device, and your details are already there."],
     ["How long is each meeting?", "Ten minutes. Writers keep their pitch to 5 minutes or less, and the rest is your questions and feedback. You get 5 minutes between writers for the scorecard. Some writers book two times in a row with you, to pitch a second book or ask questions beyond the book they're pitching."],
     ["How am I paid?", "By direct deposit (ACH) within XYZ days of Pitch Day. After you sign up, we send a short contract. Once it's signed, you get our ACH payment sign-up with a W-9."],
     ["Do I tell writers about requests on the call?", "Yes. Give each writer a yes or no on requesting pages before the call ends. Your 60-second scorecard, filled out right after each session, adds your notes to their Pitch Report."],
     ["What do I get before Pitch Day?", "Five days before the event, your schedule and a one-page packet for each writer appear in your Agent Portal: logline, comps, genre and word count. For Live Pre-Read sessions, you also get the query letter and first 5 pages ahead of time."],
     ["How does the scorecard work?", "Your packet opens on your phone or computer from your Agent Portal. Under each writer's one-page is a Score this pitch button. Tap it when the call ends: the writer's name and time are already filled in, and it takes about a minute."],
     ["What are true beginners?", "Writers who want practice or a conversation instead of a full pitch. If you tick the box on the form, writers can filter for you, and those meetings are marked in your packet."],
     ["What are pro-bono times?", "If you opt in, you set aside 2 of your times each Pitch Day for writers from historically underrepresented communities, including BIPOC and LGBTQ+ writers. Those 2 times are unpaid. We review applications, and approved writers book open pro-bono times first come, first served."],
     ["What is the First Pages Slam?", "A paid panel on Saturdays at 9:00 AM Pacific. A moderator reads writers' first pages aloud to three agents, and each agent says where they'd stop reading and why. Opt in on the form if you'd like to sit on the panel. We keep your pitch hours clear during it."],
     ["What do I get after Pitch Day?", "Your Pitch Day Report, the evening of the event. It's built from your scorecards and lists every writer you asked for a full, a partial or a query with pages, with their title, logline, genre, word count, contact email and your own note, plus the writers you passed on. Requested pages come in marked Pitch Day, so you can match them to the report."],
     ["What is the AI commitment?", "Every Pitch Day agent agrees not to put writers' query letters, pages, pitches or packets into any AI tool. We tell writers this on the booking page, and it's in your contract. Writers also confirm that the work they share is their own, not AI-generated."],
     ["What time zone are the times in?", "The form shows Pitch Day hours in your own time zone. Pick a different one from the menu if you'll be traveling. We store everything in Eastern and send your schedule in your time zone."],
     ["What if something changes?", "Tell us as soon as you can. We'll move or rebook your writers with care, and they get first pick of open times with another agent or credit toward the next Pitch Day."],
     ["Can a colleague join too?", "Yes. Mention them in the notes at the end of the form, or forward this page. Each agent signs up on their own form."],
     ["Do I need special software?", "Just Zoom. Pitch Day runs in StoryCraft's Zoom rooms, so you don't set up a meeting or share a link. Join from the link in your schedule 15 minutes before your first time, and a producer brings each writer to you. We handle bookings, reminders and calendar invites for writers."],
     ["Is there a code of conduct?", "Yes. It covers writers, agents and our team, and you agree to it on the form. It also tells writers that your decisions are final and asks them not to email you to reconsider. You can read it in full under the agreements on the sign-up form."]
    ],
    u = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
    l = [
     ["America/Los_Angeles", "Pacific (US & Canada)"],
     ["America/Denver", "Mountain (US & Canada)"],
     ["America/Phoenix", "Arizona"],
     ["America/Chicago", "Central (US & Canada)"],
     ["America/New_York", "Eastern (US & Canada)"],
     ["America/Halifax", "Atlantic (Canada)"],
     ["America/St_Johns", "Newfoundland"],
     ["America/Anchorage", "Alaska"],
     ["Pacific/Honolulu", "Hawaii"],
     ["America/Mexico_City", "Mexico City"],
     ["America/Sao_Paulo", "São Paulo"],
     ["Europe/London", "London, Dublin, Lisbon"],
     ["Europe/Paris", "Paris, Berlin, Madrid, Rome"],
     ["Europe/Athens", "Athens, Helsinki"],
     ["Africa/Johannesburg", "Johannesburg"],
     ["Asia/Dubai", "Dubai"],
     ["Asia/Kolkata", "India"],
     ["Asia/Singapore", "Singapore, Manila"],
     ["Asia/Tokyo", "Tokyo, Seoul"],
     ["Australia/Perth", "Perth"],
     ["Australia/Sydney", "Sydney, Melbourne"],
     ["Pacific/Auckland", "Auckland"]
    ],
    p = {
     tz: u,
     cur: "d1",
     days: {},
     g: {},
     panels: [],
     est: {
      p: 12,
      f: 0,
      q: 0,
      w: 0,
      s: 0
     },
     done: {}
    },
    h = !1;
   n.forEach(function(e) {
    p.days[e.id] = {
     hours: [],
     cap: 12
    }
   }), T(p.tz) || (p.tz = "America/New_York");
   var f = 36e5,
    m = q("d1");
   e.querySelectorAll("[data-apd-rate]").forEach(function(e) {
    e.textContent = k(t[e.getAttribute("data-apd-rate")])
   }), e.querySelectorAll("[data-apd-days]").forEach(function(e) {
    e.textContent = "XYZ"
   }), e.querySelectorAll("[data-apd-call]").forEach(function(e) {
    e.href = "https://calendly.com/d/cs9n-2zd-tjf/half-hour-discovery-call"
   }), e.querySelectorAll("[data-apd-pin]").forEach(function(e) {
    e.src = "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/sites/2148720201/images/f7783de-e8c0-abb3-25c-445823b37d0d_certified_organic_storyteller.png"
   }), w(t.pitch) && w(t.feedback) && w(t.qletter) && w(t.pages) && w(t.panel) && (o("apd-phnote").style.display = "none"), o("apd-adds").innerHTML = ["A hook I can repeat in one line", "Clear stakes up front", "Recent comps (last 5 years)", "Knowing how it ends", "Voice and personality", "A conversation, not a script", "Why you are the one to write it", "Time left for my questions"].map(function(e) {
    return '<button type="button" class="apd-add" data-apd-like="' + A(e) + '">+ ' + A(e) + "</button>"
   }).join("");
   var g, y = !1,
    v = ["agAI", "agChanges", "agScore", "agPrivate", "agPromo", "agConduct", "notes"];
   e.addEventListener("click", function(t) {
    var a = t.target.closest("[data-apd-hr],[data-apd-quick],[data-apd-cap],[data-apd-g],[data-apd-like],[data-apd-est],[data-apd-date],[data-apd-prof],[data-apd-again]");
    if (a)
     if (a.hasAttribute("data-apd-again")) {
      y = !1, n.forEach(function(e) {
       p.days[e.id] = {
        hours: [],
        cap: 12
       }
      }), p.panels = [], v.forEach(function(t) {
       var a = e.querySelector('#apd-f [data-k="' + t + '"]');
       a && ("checkbox" === a.type ? a.checked = !1 : a.value = "")
      }), o("apd-success").classList.remove("apd-show"), o("apd-f").style.display = "";
      var r = o("apd-go");
      r.disabled = !1, r.textContent = "Sign me up";
      var i = n.filter(function(e) {
       return !p.done[e.id]
      })[0];
      i && (p.cur = i.id), J(), de(), ae();
      var s = e.querySelector('[data-apd-sec="3"]');
      s && s.scrollIntoView({
       behavior: "smooth",
       block: "start"
      })
     } else {
      if (a.hasAttribute("data-apd-date")) return p.cur = a.getAttribute("data-apd-date"), J(), void oe();
      if (a.hasAttribute("data-apd-prof")) {
       var c = o("apd-welcome");
       return "use" === a.getAttribute("data-apd-prof") && c._pr && (ne((d = c._pr).f || {}, !1), d.done && (p.done = d.done), d.g && (p.g = d.g), d.tz && T(d.tz) && (p.tz = d.tz, j(), R()), V(), J(), de(), ae()), void c.classList.remove("apd-show")
      }
      var d;
      if (a.hasAttribute("data-apd-hr")) {
       var u = +a.getAttribute("data-apd-hr"),
        l = I().hours,
        h = l.indexOf(u);
       h >= 0 ? l.splice(h, 1) : l.push(u), J(), o("apd-hours-err").classList.remove("apd-show")
      } else if (a.hasAttribute("data-apd-quick")) {
       var m = a.getAttribute("data-apd-quick");
       if ("copy" === m) {
        var g = I(),
         b = H(p.tz),
         w = g.hours.map(function(e) {
          return Math.round((e - b) / f)
         });
        n.forEach(function(e) {
         if (e.id !== p.cur) {
          var t = H(p.tz, e.id);
          z(e.id).hours = w.map(function(e) {
           return t + e * f
          }), z(e.id).cap = g.cap
         }
        })
       } else {
        for (var k = [], A = 0; A < 16; A++) {
         var S = 5 + A;
         ("all" === m || "am" === m && S < 12 || "pm" === m && S >= 12 && S < 17 || "eve" === m && S >= 17) && k.push(O(A).getTime())
        }
        I().hours = k
       }
       J()
      } else if (a.hasAttribute("data-apd-cap")) I().cap = Math.max(1, Math.min(30, I().cap + +a.getAttribute("data-apd-cap"))), Q(), G();
      else if (a.hasAttribute("data-apd-g")) {
       var E = a.getAttribute("data-apd-g");
       p.g[E] = ((p.g[E] || 0) + 1) % 3;
       var C = p.g[E];
       a.setAttribute("data-s", C), a.setAttribute("aria-label", E + ": " + ["not set", "yes please", "no-go"][C]), K().y.length && o("apd-genre-err").classList.remove("apd-show")
      } else if (a.hasAttribute("data-apd-like")) {
       var x = o("apd-likes"),
        L = a.getAttribute("data-apd-like");
       x.value.indexOf(L) < 0 && (x.value = (x.value.trim() ? x.value.trim() + "\n" : "") + "• " + L), x.focus()
      } else if (a.hasAttribute("data-apd-est")) {
       var D = a.getAttribute("data-apd-est").split("|"),
        q = p.est,
        P = +D[1];
       return "p" === D[0] ? q.p = Math.max(1, Math.min(30, q.p + P)) : "s" === D[0] ? q.s = Math.max(0, Math.min(1, q.s + P)) : "f" === D[0] ? q.f = Math.max(0, Math.min(q.p, q.f + P)) : q[D[0]] = Math.max(0, Math.min(30, q[D[0]] + P)), q.f > q.p && (q.f = q.p), void Z()
      }
      de(), oe()
     }
   }), e.addEventListener("change", function(e) {
    var t = e.target;
    if ("apd-tz" === t.id) p.tz = t.value, j(), J();
    else if ("apd-brk" === t.id) Q();
    else if (t.hasAttribute("data-apd-panel")) {
     var a = t.getAttribute("data-apd-panel"),
      n = p.panels.indexOf(a);
     t.checked && n < 0 && p.panels.push(a), !t.checked && n >= 0 && p.panels.splice(n, 1)
    }
    t.hasAttribute("data-req") && t.classList.contains("apd-bad") && ue(t, ie(t)), "checkbox" === t.type && t.hasAttribute("data-req") && (ue(t, ie(t)), ["agAI", "agChanges", "agScore", "agPrivate", "agPromo", "agConduct"].every(function(e) {
     return te(e)
    }) && o("apd-agree-err").classList.remove("apd-show")), de(), oe()
   }), e.addEventListener("input", function(e) {
    var t = e.target;
    t.classList.contains("apd-bad") && ue(t, "apd-hslink" === t.id ? se() : ie(t)), de(), oe()
   }), e.addEventListener("focusout", function(e) {
    var t = e.target;
    t.hasAttribute && t.hasAttribute("data-req") && "checkbox" !== t.type && (t.value || "").trim() && ue(t, ie(t))
   }), o("apd-f").addEventListener("submit", function(t) {
    t.preventDefault();
    var r = [];
    e.querySelectorAll("#apd-f [data-req]").forEach(function(e) {
     var t = ie(e);
     ue(e, t), t || r.push(e)
    });
    var i = se();
    ue(o("apd-hslink"), i), i || r.push(o("apd-hslink"));
    var s = Y();
    o("apd-hours-err").classList.toggle("apd-show", !s), s || r.push(o("apd-hours"));
    var c = K().y.length > 0;
    o("apd-genre-err").classList.toggle("apd-show", !c), c || r.push(o("apd-genre-err"));
    var d = ["agAI", "agChanges", "agScore", "agPrivate", "agPromo", "agConduct"].every(function(e) {
     return te(e)
    });
    o("apd-agree-err").classList.toggle("apd-show", !d);
    var u = o("apd-formerr");
    if (r.length) return r.sort(function(e, t) {
     return e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    }), u.textContent = "A few things still need your attention. They're marked in red.", u.classList.add("apd-show"), (r[0].closest(".apd-f,.apd-fs,.apd-agree") || r[0]).scrollIntoView({
     behavior: "smooth",
     block: "center"
    }), void(r[0].focus && /INPUT|TEXTAREA|SELECT/.test(r[0].tagName) && setTimeout(function() {
     r[0].focus({
      preventScroll: !0
     })
    }, 400));
    u.classList.remove("apd-show");
    var l = function() {
      var e = K(),
       t = p.tz,
       a = {
        link: "Link: " + te("hslink"),
        agency: "Use the photo on their agency website",
        email: "Will email it with the contract"
       } [te("hs")],
       r = ["Agency: " + te("agency"), "Title: " + te("title"), "Pronouns: " + (te("pronouns") || "-"), "Assistant cc: " + (te("cc") || "-"), "Headshot: " + a, "Website and socials: " + (te("links") || "-"), "Currently: " + te("open"), "How writers send requested pages: " + te("requests"), "", "Bio:", te("bio")].join("\n"),
       o = [];
      n.forEach(function(e) {
       var a = z(e.id);
       a.hours.length && o.push(M(e.id), "  Hours (Eastern): " + B("America/New_York", !1, e.id) + " ET", "  Hours (agent's time, " + t + "): " + B(t, !0, e.id) + " " + L(q(e.id), t), "  UTC: " + U(a.hours).map(function(e) {
        return new Date(e[0]).toISOString().slice(11, 16) + "-" + new Date(e[1]).toISOString().slice(11, 16)
       }).join(", "), "  Most pitches: " + a.cap + " (hours fit " + F(e.id) + ")", "")
      }), o.push("15-minute break after every " + te("brk") + " pitches");
      var i = n.filter(function(e) {
       return p.done[e.id] && p.done[e.id].hours && p.done[e.id].hours.length
      });
      i.length && o.push("", "Already signed up on this device before: " + i.map(function(e) {
       return M(e.id, !0) + " (" + X(e.id, "America/New_York") + " ET)"
      }).join(", ")), o = o.join("\n");
      var s = ["WANTS: " + (e.y.join(", ") || "-"), "NO-GO: " + (e.n.join(", ") || "-"), "Genre notes: " + (te("genrenote") || "-"), "MSWL link: " + (te("mswlurl") || "-"), "", "Wishlist:", te("mswl"), "", "Enjoys in a pitch:", te("likes")].join("\n"),
       c = [];
      n.forEach(function(e) {
       N(e.id).forEach(function(t) {
        p.panels.indexOf(t.id) >= 0 && z(e.id).hours.length && c.push(M(e.id, !0) + " " + t.label + " (" + C(new Date(t.start), "America/New_York") + " ET)")
       })
      });
      var d = ["Open to true beginners: " + (te("optBeginner") ? "YES" : "no"), "Offers 2 pro-bono times: " + (te("optProBono") ? "YES" : "no"), "First Pages Slam panel: " + (te("optSlam") ? "YES" : "no"), "Live Pre-Read sessions: " + (te("optFeedback") ? "YES" : "no"), "Written Query Letter feedback: " + (te("optQletter") ? "YES" : "no"), "Written First Pages feedback: " + (te("optPages") ? "YES" : "no"), "Teach a StoryCraft workshop ($150 + commission): " + (te("optTeach") ? "YES" + (te("topics") ? " - " + te("topics") : "") : "no"), "", "Agreed (" + (new Date).toISOString() + "):", "- No AI on writers' material", "- Will report changes ASAP", "- Scorecard right after each pitch session", "- No recording; keep writers' work private", "- StoryCraft may feature name, photo, bio and wishlist", "- Pitch Day Code of Conduct", "", "Notes: " + (te("notes") || "-")].join("\n");
      return {
       name: te("name"),
       email: te("email"),
       phone: te("phone"),
       c45: r,
       c46: o,
       c47: s,
       c48: d
      }
     }(),
     f = o("apd-go");
    if (h) fe(l);
    else {
     f.disabled = !0, f.textContent = "Sending...";
     var m = le();
     m || ((m = document.createElement("form")).method = "post", m.action = "/forms/" + a + "/form_submissions", m.style.display = "none", document.body.appendChild(m)), pe(m, "name", l.name), pe(m, "email", l.email), pe(m, "phone_number", l.phone), pe(m, "custom_45", l.c45), pe(m, "custom_46", l.c46), pe(m, "custom_47", l.c47), pe(m, "custom_48", l.c48), fetch(m.action, {
      method: "POST",
      body: new FormData(m),
      credentials: "same-origin",
      redirect: "follow"
     }).then(function(e) {
      if (!e.ok || !e.redirected && !/thank/i.test(e.url || "")) throw new Error("status " + e.status);
      fe(l)
     }).catch(function() {
      f.disabled = !1, f.textContent = "Sign me up";
      try {
       m.requestSubmit ? m.requestSubmit() : m.submit()
      } catch (e) {
       u.textContent = "Something went wrong sending the form. Please try again, or book a call and we'll sign you up by hand.", u.classList.add("apd-show")
      }
     })
    }
   }), e.querySelectorAll("[data-apd-portal]").forEach(function(e) {
    e.href = "/login"
   }), o("apd-dates").innerHTML = n.filter(function(e, t) {
    return t % 2 == 0
   }).map(function(e, t) {
    var a = n[2 * t + 1],
     r = q(e.id);
    return '<button type="button" class="apd-dt" data-apd-jump="' + e.id + '" aria-label="' + A(M(e.id) + (a ? " and " + M(a.id) : "")) + '"><span>' + E(r, "UTC", {
     month: "short"
    }) + "</span><b>" + E(r, "UTC", {
     day: "numeric"
    }) + (a ? "&ndash;" + E(q(a.id), "UTC", {
     day: "numeric"
    }) : "") + "</b><small>" + E(r, "UTC", {
     weekday: "short"
    }) + (a ? " + " + E(q(a.id), "UTC", {
     weekday: "short"
    }) : "") + "</small></button>"
   }).join(""), e.addEventListener("click", function(t) {
    var a = t.target,
     r = o("apd-m-sc");
    if (a === r) return void ge();
    if (a = a.closest("[data-apd-open],[data-apd-close],[data-apd-tab],[data-apd-jump],[data-apd-o],[data-apd-scsend]")) {
     if (a.hasAttribute("data-apd-jump")) {
      t.preventDefault(), p.cur = a.getAttribute("data-apd-jump"), J(), oe();
      var i = e.querySelector('[data-apd-sec="3"]');
      return void(i && i.scrollIntoView({
       behavior: "smooth",
       block: "start"
      }))
     }
     if (a.hasAttribute("data-apd-open")) return be(a.getAttribute("data-apd-open")), r._f = a, r.classList.add("apd-open"), document.body.style.overflow = "hidden", void setTimeout(function() {
      r.querySelector(".apd-x").focus()
     }, 30);
     if (a.hasAttribute("data-apd-close")) return void ge();
     if (a.hasAttribute("data-apd-tab")) return void be(a.getAttribute("data-apd-tab"));
     if (a.hasAttribute("data-apd-o")) {
      var s = a.parentNode,
       c = s.hasAttribute("data-apd-multi"),
       d = s.querySelectorAll(".apd-o");
      return void(c && "Fine" !== a.textContent ? (d[0].setAttribute("aria-pressed", "false"), a.setAttribute("aria-pressed", String("true" !== a.getAttribute("aria-pressed")))) : (d.forEach(function(e) {
       e.setAttribute("aria-pressed", "false")
      }), a.setAttribute("aria-pressed", "true")))
     }
     var u = [].every.call(r.querySelectorAll(".apd-opts"), function(e) {
      return e.querySelector('[aria-pressed="true"]')
     });
     o("apd-scmsg").innerHTML = u ? '<div class="apd-ok">Sent. (This is a demo, so nothing was sent.) Your answers join the writer\'s other agents in their Pitch Report. <button type="button" class="apd-linkbtn" style="margin:6px 0 0;display:block" data-apd-tab="writer">See what the writer gets &rarr;</button></div>' : "<div>Tap one answer in each row to finish.</div>"
    }
   }), document.addEventListener("keydown", function(e) {
    if (o("apd-m-sc").classList.contains("apd-open"))
     if ("Escape" === e.key) ge();
     else if ("Tab" === e.key) {
      var t = [].filter.call(o("apd-m-sc").querySelectorAll("button,input"), function(e) {
        return e.offsetParent
       }),
       a = t[0],
       n = t[t.length - 1];
      e.shiftKey && document.activeElement === a ? (e.preventDefault(), n.focus()) : e.shiftKey || document.activeElement !== n || (e.preventDefault(), a.focus())
     }
   }), o("apd-faq").innerHTML = d.map(function(e) {
    return "<details><summary>" + A(e[0]) + "</summary><p>" + A(e[1]) + "</p></details>"
   }).join("");
   var b = function() {
    try {
     var e = JSON.parse(localStorage.getItem(i) || "null");
     return !!e && (e.s && (e.s.tz && T(e.s.tz) && (p.tz = e.s.tz), e.s.days && n.forEach(function(t) {
      var a = e.s.days[t.id];
      a && (p.days[t.id] = {
       hours: a.hours || [],
       cap: a.cap || 12
      })
     }), e.s.cur && P(e.s.cur) && (p.cur = e.s.cur), p.g = e.s.g || {}, p.panels = e.s.panels || []), ne(e.f, !0), o("apd-saved").textContent = "Draft restored", !0)
    } catch (e) {
     return !1
    }
   }();
   j(), R(), J(), V(), Z(), de(), he(),
    function(e) {
     if ((location.search.match(/[?&]a=([^&]+)/) || [])[1], /[?&]apd-demo=returning/.test(location.search)) {
      h = !0;
      var t = Date.UTC(2027, 4, 14, 15);
      return re({
       f: {
        name: "Sample Agent",
        email: "sample@example.com",
        phone: "555-0100",
        agency: "Sample Literary",
        requests: "Through my QueryManager with Pitch Day in the subject line",
        bio: "Sample Agent is a fictional agent used to preview the returning-agent form. Their details fill in here so you can see what an agent who already signed up sees when they come back to add another date.",
        mswl: "Fictional sample wishlist for the preview. Gothic historical fiction, upmarket book club fiction with older protagonists, and narrative nonfiction about lesser-known crafts. Not looking for YA or picture books right now.",
        likes: "A hook I can repeat in one line"
       },
       g: {
        Adult: 1,
        Historical: 1
       },
       tz: "America/New_York",
       done: {
        d1: {
         hours: [t, t + f, t + 2 * f],
         cap: 12
        }
       }
      }, "link"), void J()
     }
     try {
      var a = JSON.parse(localStorage.getItem(s) || "null");
      if (a && a.done && (p.done = a.done), G(), e) return;
      a && a.f && a.f.name && re(a, "device")
     } catch (e) {}
    }(b), setTimeout(he, 800)
  }

  function w(e) {
   return "number" == typeof e && isFinite(e)
  }

  function be(t) {
   e.querySelectorAll(".apd-tab").forEach(function(e) {
    e.setAttribute("aria-selected", String(e.getAttribute("data-apd-tab") === t))
   }), e.querySelectorAll(".apd-pane").forEach(function(e) {
    e.hidden = e.id !== "apd-p-" + t
   });
   var a = o("apd-m-sc");
   a.scrollTop = 0
  }

  function ge() {
   var e = o("apd-m-sc");
   e.classList.remove("apd-open"), document.body.style.overflow = "", e._f && e._f.focus && e._f.focus()
  }

  function k(e) {
   return w(e) ? "$" + e.toLocaleString("en-US") : "$" + e
  }

  function A(e) {
   return String(null == e ? "" : e).replace(/[&<>"']/g, function(e) {
    return {
     "&": "&amp;",
     "<": "&lt;",
     ">": "&gt;",
     '"': "&quot;",
     "'": "&#39;"
    } [e]
   })
  }

  function S(e) {
   return (e = (e || "").trim()) ? e.split(/\s+/).length : 0
  }

  function T(e) {
   try {
    return new Intl.DateTimeFormat("en-US", {
     timeZone: e
    }), !0
   } catch (e) {
    return !1
   }
  }

  function E(e, t, a) {
   var n = {
    timeZone: t
   };
   for (var r in a) n[r] = a[r];
   return new Intl.DateTimeFormat("en-US", n).format(e)
  }

  function C(e, t) {
   return E(e, t, {
    hour: "numeric",
    minute: "2-digit"
   })
  }

  function x(e, t) {
   return E(e, t, {
    weekday: "short"
   })
  }

  function L(e, t) {
   try {
    for (var a = new Intl.DateTimeFormat("en-US", {
      timeZone: t,
      timeZoneName: "short"
     }).formatToParts(e), n = 0; n < a.length; n++)
     if ("timeZoneName" === a[n].type) return a[n].value
   } catch (e) {}
   return ""
  }

  function D(e) {
   var t = e.split("-");
   return [+t[0], +t[1] - 1, +t[2]]
  }

  function q(e) {
   var t = D(P(e).iso);
   return new Date(Date.UTC(t[0], t[1], t[2], 16))
  }

  function P(e) {
   return n.filter(function(t) {
    return t.id === e
   })[0]
  }

  function M(e, t) {
   return E(q(e), "UTC", t ? {
    month: "short",
    day: "numeric"
   } : {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
   })
  }

  function z(e) {
   return p.days[e]
  }

  function I() {
   return p.days[p.cur]
  }

  function Y() {
   return n.some(function(e) {
    return z(e.id).hours.length
   })
  }

  function N(e) {
   var t = D(P(e).iso);
   return r.map(function(a) {
    var n = a[2].split(":"),
     r = Date.UTC(t[0], t[1], t[2], +n[0], +n[1]);
    return {
     id: e + "-" + a[0],
     date: e,
     label: a[1],
     start: r - _("America/New_York", r)
    }
   })
  }

  function _(e, t) {
   var a = {};
   return new Intl.DateTimeFormat("en-US", {
    timeZone: e,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
   }).formatToParts(new Date(t)).forEach(function(e) {
    a[e.type] = e.value
   }), Date.UTC(+a.year, +a.month - 1, +a.day, +a.hour % 24, +a.minute) - t
  }

  function H(e, t) {
   var a = D(P(t || p.cur).iso),
    n = Date.UTC(a[0], a[1], a[2], 5),
    r = n - _(e, n);
   return n - _(e, r)
  }

  function O(e, t) {
   return new Date(H(p.tz, t) + e * f)
  }

  function j() {
   n.forEach(function(e) {
    var t = H(p.tz, e.id),
     a = t + 16 * f,
     n = z(e.id);
    n.hours = n.hours.filter(function(e) {
     return e >= t && e < a
    })
   })
  }

  function W(e, t, a) {
   var n = C(e, a),
    r = C(t, a);
   return n.slice(-2) === r.slice(-2) && (n = n.slice(0, -3)), (n + "–" + r).replace(/:00/g, "")
  }

  function U(e) {
   var t = e.slice().sort(function(e, t) {
     return e - t
    }),
    a = [],
    n = null;
   return t.forEach(function(e) {
    n && e === n[1] ? n[1] = e + f : (n = [e, e + f], a.push(n))
   }), a
  }

  function F(e) {
   var t = 4 * z(e || p.cur).hours.length,
    a = +(o("apd-brk").value || 6);
   return Math.floor(t * a / (a + 1))
  }

  function Z() {
   var e = p.est;
   o("apd-ep").textContent = e.p, o("apd-ef").textContent = e.f, o("apd-eq").textContent = e.q, o("apd-ew").textContent = e.w, o("apd-es").textContent = e.s;
   var a = [e.p + " pitch" + (1 === e.p ? "" : "es") + " × " + k(t.pitch)];
   e.f && a.push(e.f + " pre-read × " + k(t.feedback)), e.q && a.push(e.q + " written query × " + k(t.qletter)), e.w && a.push(e.w + " written pages × " + k(t.pages)), e.s && a.push("Slam panel " + k(t.panel));
   var n = w(t.pitch) && (!e.f || w(t.feedback)) && (!e.q || w(t.qletter)) && (!e.w || w(t.pages)) && (!e.s || w(t.panel)) && !0;
   o("apd-etotal").textContent = n ? k(e.p * t.pitch + (e.f ? e.f * t.feedback : 0) + (e.q ? e.q * t.qletter : 0) + (e.w ? e.w * t.pages : 0) + (e.s ? t.panel : 0)) : "$XYZ", o("apd-ebreak").textContent = a.join(" + ")
  }

  function R() {
   var e = o("apd-tz"),
    t = l.slice();
   t.some(function(e) {
    return e[0] === p.tz
   }) || t.unshift([p.tz, p.tz.replace(/_/g, " ").replace(/\//g, " / ")]);
   var a = m;
   e.innerHTML = t.map(function(e) {
    return '<option value="' + e[0] + '"' + (e[0] === p.tz ? " selected" : "") + ">" + A(e[1]) + " (" + L(a, e[0]) + ")" + (e[0] === u ? " · detected" : "") + "</option>"
   }).join("")
  }

  function G() {
   o("apd-dtabs").innerHTML = n.map(function(e) {
    var t = z(e.id).hours.length,
     a = e.id === p.cur;
    return '<button type="button" role="tab" class="apd-dtab' + (t ? " apd-has" : "") + '" data-apd-date="' + e.id + '" aria-selected="' + a + '"><b>' + M(e.id, !0) + "</b><small>" + E(q(e.id), "UTC", {
     weekday: "long"
    }) + ", " + E(q(e.id), "UTC", {
     year: "numeric"
    }) + "</small><small>" + (t ? "✓ " + t + " hour" + (1 === t ? "" : "s") + (p.done[e.id] ? " added" : "") : p.done[e.id] ? "✓ Signed up" : "Not signed up") + "</small></button>"
   }).join(""), o("apd-dname").textContent = M(p.cur);
   var e = p.done[p.cur],
    t = o("apd-donenote");
   e && e.hours && e.hours.length ? (t.innerHTML = "<b>You're already signed up for this date:</b> " + X(p.cur, p.tz) + " " + L(q(p.cur), p.tz) + ". Pick hours here only to add to them.", t.classList.add("apd-show")) : (t.innerHTML = "", t.classList.remove("apd-show"))
  }

  function J() {
   for (var e = p.tz, t = "", a = "America/New_York", r = I().hours, i = 0; i < 16; i++) {
    var s = O(i),
     c = new Date(s.getTime() + f),
     d = s.getTime(),
     l = r.indexOf(d) >= 0,
     h = x(s, a);
    t += '<button type="button" class="apd-hr" data-apd-hr="' + d + '" aria-pressed="' + l + '">' + (e !== a && x(q(p.cur), "UTC") !== h ? '<span class="apd-flag">' + h + " ET</span>" : "") + "<b>" + W(s, c, e) + "</b><small>" + (e === a ? "Eastern" : W(s, c, a) + " ET") + "</small></button>"
   }
   o("apd-hours").innerHTML = t, o("apd-tznote").textContent = e === u ? "" : "(your device says " + u.replace(/_/g, " ") + ")", G(), Q(),
    function() {
     if (!o("apd-sess")) return;
     var e = p.tz,
      t = n.filter(function(e) {
       return z(e.id).hours.length
      });
     if (!t.length) return void(o("apd-sess").innerHTML = '<span class="apd-help">Pick your dates in section 3 to see the panel sessions for each one.</span>');
     o("apd-sess").innerHTML = t.map(function(t) {
      return '<div class="apd-sessdate">' + M(t.id) + "</div>" + N(t.id).map(function(t) {
       var a = new Date(t.start),
        n = new Date(t.start + 36e5),
        r = p.panels.indexOf(t.id) >= 0,
        o = function(e) {
         var t = e.start + 36e5;
         return z(e.date).hours.some(function(a) {
          return a < t && e.start < a + f
         })
        }(t);
       return '<label class="' + (o ? "apd-clash" : "") + '"><input type="checkbox" data-apd-panel="' + t.id + '"' + (r ? " checked" : "") + "><span>" + t.label + ": " + W(a, n, e) + " " + L(a, e) + (o ? "<em>Overlaps your pitch hours. We'll keep pitches clear during this hour.</em>" : "") + "</span></label>"
      }).join("")
     }).join("")
    }()
  }

  function B(e, t, a) {
   var dw = x(q(a || p.cur), "UTC");
   return U(z(a || p.cur).hours).map(function(a) {
    var n = new Date(a[0]);
    return W(n, new Date(a[1]), e) + (t && dw !== x(n, e) ? " (" + x(n, e) + ")" : "")
   }).join(", ")
  }

  function X(e, t) {
   return U(p.done[e].hours).map(function(e) {
    return W(new Date(e[0]), new Date(e[1]), t)
   }).join(", ")
  }

  function $(e) {
   var t = z(e),
    a = t.hours.length,
    n = F(e),
    r = p.tz,
    o = L(q(e), r),
    i = "<b>" + a + " hour" + (1 === a ? "" : "s") + ":</b> " + B(r, !0, e) + " " + o + ("America/New_York" !== r ? ' <span style="color:var(--muted)">(' + B("America/New_York", !1, e) + " ET)</span>" : "") + "<br>";
   return i += "Those hours fit up to <b>" + n + " pitches</b> with breaks. Your cap is <b>" + t.cap + "</b>.", t.cap > n && (i += ' <span class="apd-warn">Add an hour or lower your cap so every slot fits.</span>'), i
  }

  function Q() {
   o("apd-cap").textContent = I().cap, o("apd-hsum").innerHTML = I().hours.length ? $(p.cur) : "No hours chosen for " + M(p.cur) + " yet. Tap the hours you can take pitches, or pick another date.";
   var e = n.filter(function(e) {
    return z(e.id).hours.length
   });
   o("apd-allsum").innerHTML = e.length ? "<b>Signed up for:</b> " + e.map(function(e) {
    return M(e.id, !0) + " (" + z(e.id).hours.length + " hr" + (1 === z(e.id).hours.length ? "" : "s") + ", up to " + z(e.id).cap + " pitches)"
   }).join(" · ") : ""
  }

  function V() {
   e.querySelectorAll("[data-apd-chips]").forEach(function(e) {
    var t = e.getAttribute("data-apd-chips");
    e.innerHTML = c[t].map(function(e) {
     var t = p.g[e] || 0;
     return '<button type="button" class="apd-chip" data-apd-g="' + A(e) + '" data-s="' + t + '" aria-label="' + A(e) + ": " + ["not set", "yes please", "no-go"][t] + '">' + A(e) + "</button>"
    }).join("")
   })
  }

  function K() {
   var e = [],
    t = [];
   return ["age", "fic", "nf"].forEach(function(a) {
    c[a].forEach(function(a) {
     1 === p.g[a] ? e.push(a) : 2 === p.g[a] && t.push(a)
    })
   }), {
    y: e,
    n: t
   }
  }

  function ee() {
   return Array.prototype.slice.call(e.querySelectorAll("#apd-f [data-k]"))
  }

  function te(t) {
   var a = e.querySelectorAll('#apd-f [data-k="' + t + '"]');
   if (!a.length) return "";
   var n = a[0];
   if ("radio" === n.type) {
    for (var r = 0; r < a.length; r++)
     if (a[r].checked) return a[r].value;
    return ""
   }
   return "checkbox" === n.type ? n.checked : (n.value || "").trim()
  }

  function ae() {
   if (!y && !h) try {
    var e = {
     s: {
      tz: p.tz,
      cur: p.cur,
      days: p.days,
      g: p.g,
      panels: p.panels
     },
     f: {}
    };
    ee().forEach(function(t) {
     var a = t.getAttribute("data-k");
     "radio" === t.type ? t.checked && (e.f[a] = t.value) : "checkbox" === t.type ? e.f[a] = t.checked : e.f[a] = t.value
    }), localStorage.setItem(i, JSON.stringify(e)), o("apd-saved").textContent = "Saved on this device"
   } catch (e) {}
  }

  function ne(e, t) {
   ee().forEach(function(a) {
    var n = a.getAttribute("data-k");
    !(n in e) || !t && v.indexOf(n) >= 0 || ("radio" === a.type ? a.checked = a.value === e[n] : "checkbox" === a.type ? a.checked = !!e[n] : "tz" !== n && (a.value = e[n]))
   })
  }

  function re(e, t) {
   var a, r, i = o("apd-welcome"),
    s = (e.f && e.f.name || "").split(" ")[0];
   i.innerHTML = "<p><b>Welcome back" + (s ? ", " + A(s) : "") + ".</b> " + (a = e.done, ((r = n.filter(function(e) {
    return a && a[e.id] && a[e.id].hours && a[e.id].hours.length
   }).map(function(e) {
    return M(e.id, !0)
   })).length ? "You're signed up for " + r.join(", ").replace(/, ([^,]*)$/, " and $1") + "." : "link" === t ? "We found your details from your last sign-up." : "You signed up for Pitch Day on this device.") + ' Fill in your details from last time, then pick any new dates or hours. You\'ll confirm the agreements again before you send.</p><div class="apd-hero-ctas"><button type="button" class="apd-btn apd-btn-gold" data-apd-prof="use">Fill in my details</button><button type="button" class="apd-btn apd-btn-line" data-apd-prof="no">Start fresh</button></div>'), i.classList.add("apd-show"), i._pr = e
  }

  function oe() {
   clearTimeout(g), g = setTimeout(ae, 400)
  }

  function ie(e) {
   var t = e.getAttribute("data-req"),
    a = "checkbox" === e.type ? e.checked : (e.value || "").trim(),
    n = !0;
   return "text" === t ? n = a.length > 1 : "email" === t ? n = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a) : "phone" === t ? n = a.replace(/\D/g, "").length >= 7 : "url" === t ? n = /^https?:\/\/\S+\.\S+/i.test(a) : "check" === t ? n = !!a : t && 0 === t.indexOf("min:") && (n = S(a) >= +t.slice(4)), n
  }

  function se() {
   return "link" !== te("hs") || /^https?:\/\/\S+\.\S+/i.test(te("hslink"))
  }

  function ce(t) {
   var a = e.querySelector('[data-apd-sec="' + t + '"]'),
    n = !0;
   return a.querySelectorAll("[data-req]").forEach(function(e) {
    ie(e) || (n = !1)
   }), 3 !== t || Y() || (n = !1), 4 !== t || K().y.length || (n = !1), 6 !== t || se() || (n = !1), n
  }

  function de() {
   for (var t = 0, a = 1; a <= 7; a++) {
    var n = ce(a);
    e.querySelector('[data-apd-sec="' + a + '"]').classList.toggle("apd-done", n), n && t++
   }
   o("apd-ptext").textContent = t + " of 7 done", o("apd-pbar").style.width = t / 7 * 100 + "%", o("apd-mswl-c").textContent = S(o("apd-mswl").value) + " words";
   var r = S(o("apd-bio").value);
   o("apd-bio-c").textContent = r + " words" + (r > 180 ? " · a little long" : ""), o("apd-hslink-wrap").style.display = "link" === te("hs") ? "" : "none"
  }

  function ue(e, t) {
   if ("checkbox" !== e.type) {
    e.classList.toggle("apd-bad", !t);
    var a = e.closest(".apd-f");
    if (a) {
     var n = a.querySelector(".apd-err");
     n && n.classList.toggle("apd-show", !t)
    }
   } else e.closest(".apd-agree") && e.closest(".apd-agree").classList.toggle("apd-bad", !t)
  }

  function le() {
   return document.querySelector('form[action*="/forms/' + a + '/"],form[action$="/forms/' + a + '"]')
  }

  function pe(e, t, a) {
   var n = e.querySelector('[name="form_submission[' + t + ']"]');
   n || ((n = document.createElement(0 === t.indexOf("custom_") ? "textarea" : "input")).name = "form_submission[" + t + "]", n.style.display = "none", e.appendChild(n)), n.value = a;
   try {
    n.dispatchEvent(new Event("input", {
     bubbles: !0
    }))
   } catch (e) {}
  }

  function he() {
   var t = le();
   if (t) {
    t.style.display = "none";
    for (var a = t; a.parentElement && a.parentElement !== document.body && !a.parentElement.contains(e);) a = a.parentElement;
    a.style.display = "none"
   }
  }

  function fe(e) {
   clearTimeout(g), y = !0,
    function() {
     try {
      var e = {};
      ee().forEach(function(t) {
       var a = t.getAttribute("data-k");
       v.indexOf(a) >= 0 || ("radio" === t.type ? t.checked && (e[a] = t.value) : "checkbox" === t.type ? e[a] = t.checked : e[a] = t.value)
      });
      var t = JSON.parse(JSON.stringify(p.done || {}));
      n.forEach(function(e) {
       var a = z(e.id);
       if (a.hours.length) {
        var n = t[e.id] || {
         hours: [],
         cap: 0
        };
        a.hours.forEach(function(e) {
         n.hours.indexOf(e) < 0 && n.hours.push(e)
        }), n.hours.sort(function(e, t) {
         return e - t
        }), n.cap = Math.max(n.cap || 0, a.cap), t[e.id] = n
       }
      }), p.done = t, h || localStorage.setItem(s, JSON.stringify({
       f: e,
       g: p.g,
       tz: p.tz,
       done: t,
       at: Date.now()
      }))
     } catch (e) {}
    }();
   try {
    localStorage.removeItem(i)
   } catch (e) {}
   o("apd-f").style.display = "none", o("apd-s-name").textContent = (e.name || "").split(" ")[0] || "friend", o("apd-s-email").textContent = e.email;
   var t = function(e) {
     return e.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
    },
    a = n.filter(function(e) {
     return z(e.id).hours.length
    });
   o("apd-s-sum").innerHTML = a.map(function(e) {
    return "<b>" + M(e.id) + "</b><br>" + $(e.id)
   }).join("<br><br>"), o("apd-s-cals").innerHTML = a.map(function(e) {
    var a = z(e.id).hours.slice().sort(function(e, t) {
      return e - t
     }),
     n = new Date(a[0]),
     r = new Date(a[a.length - 1] + f);
    return '<a class="apd-btn apd-btn-gold" target="_blank" rel="noopener" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent("StoryCraft Pitch Day (taking pitches)") + "&dates=" + t(n) + "/" + t(r) + "&details=" + encodeURIComponent("Your Pitch Day hours: " + B(p.tz, !0, e.id) + ". Your schedule and writer packets appear in your Agent Portal 5 days before.") + '">Add ' + M(e.id, !0) + " to Google Calendar</a>"
   }).join("");
   var r = o("apd-success");
   r.classList.add("apd-show"), r.scrollIntoView({
    behavior: "smooth",
    block: "start"
   }), r.focus({
    preventScroll: !0
   })
  }
 }();
