'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _mjmlCore = require('mjml-core');

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tagName = 'mj-column';
var baseStyles = {
  div: {
    verticalAlign: 'top'
  }
};
var postRender = function postRender($) {
  var mediaQueries = [];

  (0, _each2.default)({ 'mj-column-per': '%', 'mj-column-px': 'px' }, function (unit, className) {
    var columnWidths = [];

    $('[class*="' + className + '"]').each(function () {
      columnWidths.push($(this).data('column-width'));
      $(this).removeAttr('data-column-width');
    });

    (0, _uniq2.default)(columnWidths).forEach(function (width) {
      var mediaQueryClass = className + '-' + width;

      mediaQueries.push('.' + mediaQueryClass + ', * [aria-labelledby="' + mediaQueryClass + '"] { width:' + width + unit + '!important; }');
    });
  });

  if (mediaQueries.length > 0) {
    var mediaQuery = '<style type="text/css">\n    ' + mediaQueries.join('\n') + '\n</style>\n';

    $('head').append(mediaQuery);
  }

  return $;
};

var Column = (0, _mjmlCore.MJMLElement)(_class = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Column);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Column)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.styles = _this.getStyles(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Column, [{
    key: 'getStyles',
    value: function getStyles() {
      var mjAttribute = this.props.mjAttribute;


      return (0, _merge2.default)({}, baseStyles, {
        div: {
          display: 'inline-block',
          verticalAlign: mjAttribute('vertical-align'),
          fontSize: '13px',
          textAlign: 'left',
          width: this.getMobileWidth()
        },
        table: {
          verticalAlign: mjAttribute('vertical-align'),
          background: mjAttribute('background-color')
        }
      });
    }
  }, {
    key: 'getColumnClass',
    value: function getColumnClass() {
      var _props = this.props;
      var mjAttribute = _props.mjAttribute;
      var sibling = _props.sibling;

      var width = mjAttribute('width');

      if (width == undefined) {
        return 'mj-column-per-' + parseInt(100 / sibling);
      }

      var _helpers$widthParser = _mjmlCore.helpers.widthParser(width);

      var parsedWidth = _helpers$widthParser.width;
      var unit = _helpers$widthParser.unit;


      switch (unit) {
        case '%':
          return 'mj-column-per-' + parsedWidth;

        case 'px':
        default:
          return 'mj-column-px-' + parsedWidth;
      }
    }
  }, {
    key: 'getMobileWidth',
    value: function getMobileWidth() {
      var _props2 = this.props;
      var mjAttribute = _props2.mjAttribute;
      var sibling = _props2.sibling;
      var parentWidth = _props2.parentWidth;
      var mobileWidth = _props2.mobileWidth;

      var width = mjAttribute('width');

      if (mobileWidth != "mobileWidth") {
        return '100%';
      } else if (width == undefined) {
        return parseInt(100 / sibling) + '%';
      }

      var _helpers$widthParser2 = _mjmlCore.helpers.widthParser(width);

      var parsedWidth = _helpers$widthParser2.width;
      var unit = _helpers$widthParser2.unit;


      switch (unit) {
        case '%':
          return width;
        case 'px':
        default:
          return parsedWidth / parentWidth + '%';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var mjAttribute = _props3.mjAttribute;
      var children = _props3.children;
      var sibling = _props3.sibling;

      var width = mjAttribute('width') || 100 / sibling;
      var mjColumnClass = this.getColumnClass();

      return _react2.default.createElement(
        'div',
        {
          'aria-labelledby': mjColumnClass,
          className: mjColumnClass,
          'data-column-width': parseInt(width),
          'data-vertical-align': this.styles.div.verticalAlign,
          style: this.styles.div },
        _react2.default.createElement(
          'table',
          {
            cellPadding: '0',
            cellSpacing: '0',
            'data-legacy-background': mjAttribute('background'),
            'data-legacy-border': '0',
            style: this.styles.table,
            width: '100%' },
          _react2.default.createElement(
            'tbody',
            null,
            children.map(function (child) {
              return _react2.default.cloneElement(child, { columnElement: true });
            })
          )
        )
      );
    }
  }]);

  return Column;
}(_react.Component)) || _class;

Column.tagName = tagName;
Column.baseStyles = baseStyles;
Column.postRender = postRender;

exports.default = Column;