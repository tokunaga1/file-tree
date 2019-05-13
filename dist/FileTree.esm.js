import SlVueTree from 'sl-vue-tree';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFile, faTimes, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  props: {
    node: {
      type: Object,
      required: true,
    }
  },
  computed: {
    title: {
      get: function get () {
        return this.node.title;
      },
      set: function set (title) {
        this.$parent.updateNode(this.node.path, { title: title });
      }
    }
  },
  methods: {
    edit: function edit () {
      var title = (prompt('Edit title', this.node.title) || '').trim();
      if (title) {
        this.title = title;
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "item-title" }, [
    _vm.node.isLeaf
      ? _c("span", { staticClass: "file" }, [
          _vm._v("\n    " + _vm._s(_vm.node.title) + "\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.node.isLeaf
      ? _c("span", { staticClass: "folder", on: { dblclick: _vm.edit } }, [
          _vm._v("\n    " + _vm._s(_vm.title) + "\n  ")
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = "data-v-2b062ecf";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var NodeTitle = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//

config.autoAddCss = false;
library.add(
  faFile,
  faTimes,
  faChevronRight,
  faChevronDown
);

var script$1 = {
  components: { SlVueTree: SlVueTree, NodeTitle: NodeTitle, FontAwesomeIcon: FontAwesomeIcon },
  props: {
    value: {
      type: String,
      default: '[]',
    },
  },
  data: function () { return ({
    nodes: [],
    selected_node_titles: '',
  }); },
  watch: {
    value: {
      immediate: true,
      handler: function handler (json) {
        if (json) {
          this.nodes = JSON.parse(json);
        }
      }
    }
  },
  mounted: function mounted () {
    window.addEventListener('keyup', this.remove_selected);
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('keyup', this.remove_selected);
  },
  methods: {
    remove: function remove (e, node) {
      var this$1 = this;

      e.stopPropagation();

      var paths = [];

      if (! node.isLeaf && confirm('Delete folder(s) with nodes?')) {
        node.children.forEach(function (node) {
          this$1.collect_paths(node, paths);
        });
      }
      paths.push(node.path);

      this.$refs.slVueTree.remove(paths);
    },

    collect_paths: function collect_paths (node, paths) {
      var this$1 = this;

      if (! node.isLeaf) {
        node.children.forEach(function (node2) {
          this$1.collect_paths(node2, paths);
        });
      }
      paths.push([node.path]);
    },

    remove_selected: function remove_selected (e) {
      if (e.keyCode !== 46 /*DELETE*/ &&
          e.keyCode !== 8 /*BACKSPACE*/)
      {
        return
      }
      var svt = this.$refs.slVueTree;
      var paths = svt.getSelected().map(function (node) {
        return node.path;
      });

      svt.remove(paths);
    },

    append_folder: function append_folder () {
      var svt = this.$refs.slVueTree;
      var last_node = _.last(svt.getSelected()) || svt.getLastNode();
      if (! last_node) {
        return;
      }

      svt.setCursorPosition({
        node: last_node,
        placement: 'after',
      });
      svt.insert(svt.cursorPosition, {
        title: 'New folder',
        isLeaf: false,
      });
      svt.setCursorPosition(null);
    },

    selected: function selected(nodes, e) {
      this.selected_node_titles = nodes.map(function (node) { return node.title; }).join('<br>');
    },

    update: function update (ref) {
      var node = ref.node;
      var title = ref.title;

      node.title = title;
    },

    get_json: function get_json () {
      return JSON.stringify(this.nodes);
    },
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("SlVueTree", {
    ref: "slVueTree",
    attrs: { "allow-multiselect": true },
    on: { select: _vm.selected },
    scopedSlots: _vm._u([
      {
        key: "title",
        fn: function(ref) {
          var node = ref.node;
          return [
            _c(
              "span",
              { staticClass: "item-icon" },
              [
                node.isLeaf
                  ? _c("FontAwesomeIcon", { attrs: { icon: "file" } })
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c("NodeTitle", {
              attrs: { node: node },
              on: { input: _vm.update }
            })
          ]
        }
      },
      {
        key: "toggle",
        fn: function(ref) {
          var node = ref.node;
          return [
            !node.isLeaf
              ? _c(
                  "span",
                  [
                    _c("FontAwesomeIcon", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: node.isExpanded,
                          expression: "node.isExpanded"
                        }
                      ],
                      attrs: { icon: "chevron-down" }
                    }),
                    _vm._v(" "),
                    _c("FontAwesomeIcon", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !node.isExpanded,
                          expression: "!node.isExpanded"
                        }
                      ],
                      attrs: { icon: "chevron-right" }
                    })
                  ],
                  1
                )
              : _vm._e()
          ]
        }
      },
      {
        key: "sidebar",
        fn: function(ref) {
          var node = ref.node;
          return [
            _c(
              "span",
              {
                staticClass: "visible-icon",
                on: {
                  click: function($event) {
                    return _vm.remove($event, node)
                  }
                }
              },
              [_c("FontAwesomeIcon", { attrs: { icon: "times" } })],
              1
            )
          ]
        }
      },
      {
        key: "draginfo",
        fn: function() {
          return [
            _c("div", {
              domProps: { innerHTML: _vm._s(_vm.selected_node_titles) }
            })
          ]
        },
        proxy: true
      }
    ]),
    model: {
      value: _vm.nodes,
      callback: function($$v) {
        _vm.nodes = $$v;
      },
      expression: "nodes"
    }
  })
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var component = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('FileTree', component);
}

var plugin = {
	install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default component;
export { install };
