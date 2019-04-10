---
templateKey: 'blog-post'
title: 'Design systems are important for rapid development [DRAFT]'
date: 2017-01-04T15:04:10.000Z
description: >-
  All about design systems
tags:
  - Design
  - Thoughts
---



If you're interested in front-end development, would like a peek into how we build ouruser interfaces here at Bytemark, or you've used Bytemark Paneland wondered whatmakes it tick, then you've come to the right place. In this article we're going to take alook at one aspect of our front-end development work: Bulma CSS framework.Successful platforms have user-friendly interfacesUser interfaces are vital to the success of any website, app or platform; functionalityis important too, but the interface is how you trigger that functionality, how youinteract with the end product - inputting data and getting a response.Some interfaces, such as the Bytemark website, are quite straightforward: theypresent some static information and offer a way to navigate through that information via a menu or series of links.


[gallery columns="2" size="medium" ids="16424,16434"]Other interfaces, such as the Facebook app or Bytemark Panelare much morecomplex with lots of moving parts, buttons to trigger different functionality, andentirely separate sections to handle different features (e.g. in Bytemark Panel wehave servers, networking and domains in separate areas to cater for each service'svery different needs).Good interfaces rely on consistent design systemsThe key to managing complex interfaces is to have a solid design system in place. Adesign system is a defined set of standard components or elements that can becombined to build an interface in a number of ways. It covers other areas too, suchas the way it looks, spacing, animations, interactions, and colours to name a few.
A unified design system is important from an internal point of view as it helps speedup development of apps and platforms: development teams are reusing tried andtested components that interact in a consistent, predictable manner.From an end-user's perspective, having a complex UI to navigate through is madeless challenging by a design-system's consistency and familiarity. This trait alsoreduces UI surprises because users come to expectthings to work in a particularway.A design system can be relatively simple, such as a set of brand guidelines coupledwith a UI component library. However, it can be a complex beast in its own right -take Google's own Material Designsystem as an example.Do you build your interfaces in-house?In smaller teams, like our close-knit, agile development team at Bytemark, we spendalmost all of our development time building products and services that our customerscan start to use sooner rather than later. Unfortunately, this doesn't leave a lot ofwiggle room to spend creating our own design systems in-house, from scratch.However, there are a lot of existing design systems out there that developmentteams have been using for years - frameworks such as TwitterBootstrapor Foundation by Zurb.We use Bulma.What is Bulma?
Bulmais a CSS framework based around modern CSS approaches, such asFlexbox. It's a competitor/alternative to the popular Bootstrap from Twitter.
From their own website:Bulma is a free, open source CSS framework based on Flexbox and used by morethan 150,000 developers.Why we use Bulma to build our user interfacesUltimately, Bulma offers a way for us to build-out our own, Bytemark-branded designsystem and UI component library, without the addition of too much code weight oropinionated JavaScript (JS) bundled in.Among other features, we especially like: Bulma's simple, lightweight code base. The lack of JS bundled in with the framework - this enables us to include ourown JS support and functionality where needed, however we choose. That it takes a very modern approach to CSS, using Flexbox to achieve asimpler grid system (or hit the holy grail of vertical centering!). The customisation opportunities Bulma offers, as well as the ease of addingnew components. The leaning towards a more Functional CSSstyle with modifier classes toadapt components. That it offers a ReactJS-friendly version, provided via the NPM repository.Bulma is also well supported by a growing community of developers and animpressive approximate 400K downloads per month.From a development angle, using such a consistent UI framework, with a predefinedcomponent library, allows us to manage UI changes across different apps muchfaster and implement new features more quickly. The UX/UI design and deliberationtime is reduced, because we don't have to focus as heavily on howthings willultimately look - we're already working within a branded component framework! Wejust have to decide how to put the pieces together to form a new section or feature(like our upcoming Kubernetes product!).How we use Bulma in our user interfaces
Whilst we have a mix of front-end technologies that we use to develop ourapplications, including AngularJS and React, we're transitioning over to React fornew projects and slowly migrating our legacy code bases over to React too.Although we have a number of customised UI components and interfaces withineach platform (Panel, internal systems, etc.), they all begin with our Bytemark-branded Bulma base. This means that the interfaces we produce can quickly havethat familiar, Bytemark-y look and feel that our customers have come to know.Let's take a brief look at how we're building our new Kubernetes product interface.Step one - we begin with wireframesKubernetes (K8s) is a software tool for managing containerised workloads and it'ssomething exciting that we're currently working on (you can read moreabout Kubernetes in our beginner's guide). As it's brand new, we need a new sectionwithin Bytemark Panel for the K8s services to live.Before we turn to our Bulma library, we start things off with a set of sketchwireframes like these:
Whilst a little rough and ready, this basic visual layout provides a guide to how afeature might look and function beforewe spend a lot of costly development timeheading down the wrong path.Already, as you'll see in the next screen shot, we can start to break up the wholeinterface into smaller, isolated parts that translate into components within our Bulmalibrary.
Step two - translate wireframes into living interfacesNow that we have a general direction to work from, our front-end team can build upthe real interface using the Bulma library. Here's a sneak peak of our Kubernetescluster listing page:
Although still very much a work in progress, you can see how we are able to take asketched idea and quickly turn it into a working model.Find out more about Kubernetes at BytemarkSo, as you can see, we're currently hard at work getting a K8s product ready tolaunch! Want to stay in the loop with updates or potentially get involved with betatesting? Join our Kubernetes waitlistto receive all the latest news.