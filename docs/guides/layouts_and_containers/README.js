Ext.data.JsonP.layouts_and_containers({"guide":"<h1>Layouts and Containers</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/layouts_and_containers-section-1'>Containers</a></li>\n<li><a href='#!/guide/layouts_and_containers-section-2'>Layouts</a></li>\n<li><a href='#!/guide/layouts_and_containers-section-3'>Component Layout</a></li>\n</ol>\n</div>\n\n<hr />\n\n<p>The layout system is one of the most powerful parts of Ext JS. It handles the sizing and positioning of every <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a> in your application. This guide covers the basics of how to get started with layouts.</p>\n\n<h2 id='layouts_and_containers-section-1'>Containers</h2>\n\n<p>An Ext JS application UI is made up of <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a>s (See the <a href=\"#/guide/components\">Components Guide</a> for more on Components.  A <a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a> is a special type of Component that can contain other Components. A typical Ext JS application is made up of several layers of nested Components</p>\n\n<p><p><img src=\"guides/layouts_and_containers/component_architecture.png\" alt=\"Component Architecture\"></p></p>\n\n<p>The most commonly used Container is <a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Panel</a>.  Let's take a look at how being a Container allows a Panel to contain other Components:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>', {\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    width: 400,\n    height: 300,\n    title: 'Container Panel',\n    items: [\n        {\n            xtype: 'panel',\n            title: 'Child Panel 1',\n            height: 100,\n            width: '75%'\n        },\n        {\n            xtype: 'panel',\n            title: 'Child Panel 2',\n            height: 100,\n            width: '75%'\n        }\n    ]\n});\n</code></pre>\n\n<p>We just created a Panel that renders itself to the document body, and we used the <a href=\"#!/api/Ext.container.Container-cfg-items\" rel=\"Ext.container.Container-cfg-items\" class=\"docClass\">items</a> config to add two child Panels to our Container Panel.</p>\n\n<h2 id='layouts_and_containers-section-2'>Layouts</h2>\n\n<p>Every <a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a> has a <a href=\"#!/api/Ext.layout.container.Container\" rel=\"Ext.layout.container.Container\" class=\"docClass\">Layout</a> that manages the sizing and positioning of its child <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a>s.  In this section we're going to discuss how to configure a Container to use a specific type of Layout, and how the layout system keeps everything in sync.</p>\n\n<h3>Using Layouts</h3>\n\n<p>In the above example we did not specify a layout for the Container <a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Panel</a>. Notice how the child Panels are laid out one after the other, just as normal block elements would be in the DOM. This happens because the default layout for all Containers is <a href=\"#!/api/Ext.layout.container.Auto\" rel=\"Ext.layout.container.Auto\" class=\"docClass\">Auto Layout</a>. Auto Layout does not specify any special positioning or sizing rules for child elements.  Let's assume, for example, we want our two child Panels to be positioned side by side, and to each take up exactly 50% of the width of the Container - we can use a <a href=\"#!/api/Ext.layout.container.Column\" rel=\"Ext.layout.container.Column\" class=\"docClass\">Column Layout</a> simply by providing a <a href=\"#!/api/Ext.container.Container-cfg-layout\" rel=\"Ext.container.Container-cfg-layout\" class=\"docClass\">layout</a> config on the Container:</p>\n\n<pre class='inline-example '><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>', {\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    width: 400,\n    height: 200,\n    title: 'Container Panel',\n    layout: 'column',\n    items: [\n        {\n            xtype: 'panel',\n            title: 'Child Panel 1',\n            height: 100,\n            columnWidth: 0.5\n        },\n        {\n            xtype: 'panel',\n            title: 'Child Panel 2',\n            height: 100,\n            columnWidth: 0.5\n        }\n    ]\n});\n</code></pre>\n\n<p>Ext JS comes with a full set of layouts out of the box and can accomodate almost any type of layout you can imagine.  See the <a href=\"extjs/examples/#sample-7\">Layout Examples</a> to get an idea of what's possible.</p>\n\n<h3>How the layout system works</h3>\n\n<p>A <a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a>'s <a href=\"#!/api/Ext.layout.container.Container\" rel=\"Ext.layout.container.Container\" class=\"docClass\">Layout</a> is responsible for the initial positioning and sizing of all of the Container's children.  Internally the framework calls the Container's <a href=\"#!/api/Ext.container.Container-method-doLayout\" rel=\"Ext.container.Container-method-doLayout\" class=\"docClass\">doLayout</a> method which triggers the Layout to calculate the correct sizes and positions for all of the Container's children and update the DOM. The <code>doLayout</code> method is fully recursive, so any of the Container's children that are also  will have their <code>doLayout</code> method called as well. This continues until the bottom of the <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a> hierarchy is reached. You typically will not have to ever call <code>doLayout()</code> in your application code since the framework should handle it for you.</p>\n\n<p>A re-layout is triggered when the Container is <a href=\"#!/api/Ext.container.Container-method-setSize\" rel=\"Ext.container.Container-method-setSize\" class=\"docClass\">resized</a>, or when child Component <a href=\"#!/api/Ext.container.Container-cfg-items\" rel=\"Ext.container.Container-cfg-items\" class=\"docClass\">items</a> are <a href=\"#!/api/Ext.container.Container-method-add\" rel=\"Ext.container.Container-method-add\" class=\"docClass\">added</a> or <a href=\"#!/api/Ext.container.Container-method-remove\" rel=\"Ext.container.Container-method-remove\" class=\"docClass\">removed</a>. Normally we can just rely on the framework to handle updating the layout for us, but sometimes we want to prevent the framework from automatically laying out so we can batch multiple operations together and then manually trigger a layout when we're done.  To do this we use the <a href=\"#!/api/Ext.container.Container-cfg-suspendLayout\" rel=\"Ext.container.Container-cfg-suspendLayout\" class=\"docClass\">suspendLayout</a> flag on the Container to prevent it from laying out while we perform our operations that would normally trigger a layout (adding or removing items for example).  When we're done all we have to do is turn the <code>suspendLayout</code> flag off and manually trigger a layout by calling the Container's <code>doLayout</code> method:</p>\n\n<pre class='inline-example '><code>var containerPanel = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Ext.panel.Panel</a>', {\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    width: 400,\n    height: 200,\n    title: 'Container Panel',\n    layout: 'column',\n    suspendLayout: true // Suspend automatic layouts while we do several different things that could trigger a layout on their own\n});\n// Add a couple of child items.  We could add these both at the same time by passing an array to add(),\n// but lets pretend we needed to add them separately for some reason.\ncontainerPanel.add({\n    xtype: 'panel',\n    title: 'Child Panel 1',\n    height: 100,\n    columnWidth: 0.5\n});\ncontainerPanel.add({\n    xtype: 'panel',\n    title: 'Child Panel 2',\n    height: 100,\n    columnWidth: 0.5\n});\n// Turn the suspendLayout flag off.\ncontainerPanel.suspendLayout = false;\n// Trigger a layout.\ncontainerPanel.doLayout();\n</code></pre>\n\n<h2 id='layouts_and_containers-section-3'>Component Layout</h2>\n\n<p>Just like a <a href=\"#!/api/Ext.container.Container\" rel=\"Ext.container.Container\" class=\"docClass\">Container</a>'s <a href=\"#!/api/Ext.layout.container.Container\" rel=\"Ext.layout.container.Container\" class=\"docClass\">Layout</a> defines how a Container sizes and positions its <a href=\"#!/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Component</a> <a href=\"#!/api/Ext.container.Container-cfg-items\" rel=\"Ext.container.Container-cfg-items\" class=\"docClass\">items</a>, a Component also has a <a href=\"#!/api/Ext.layout.Layout\" rel=\"Ext.layout.Layout\" class=\"docClass\">Layout</a> which defines how it sizes and positions its internal child items.  Component layouts are configured using the <a href=\"#!/api/Ext.Component-cfg-componentLayout\" rel=\"Ext.Component-cfg-componentLayout\" class=\"docClass\">componentLayout</a> config option.  Generally, you will not need to use this configuration unless you are writing a custom Component since all of the provided Components which need their internal elements sized and positioned come with their own layout managers.  Most Components use <a href=\"#!/api/Ext.layout.container.Auto\" rel=\"Ext.layout.container.Auto\" class=\"docClass\">Auto Layout</a>, but more complex Components will require a custom component layout (for example a <a href=\"#!/api/Ext.panel.Panel\" rel=\"Ext.panel.Panel\" class=\"docClass\">Panel</a> that has a header, footer, and toolbars).</p>\n","title":"Layouts and Containers"});