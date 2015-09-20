IWillCookThat.Views.Header = Backbone.CompositeView.extend({

  template: JST['shared/header'],

  events: {
    "click button.log-out": "signOut",
    "click button.log-in": "addLogInForm"
  },

  initialize: function(options) {
    this.listenTo(IWillCookThat.currentUser, "sync", this.render);
    this.listenTo(IWillCookThat.currentUser, "signIn signOut", this.render);
    this.render();
  },

  render: function() {
    var content = this.template({ currentUser: IWillCookThat.currentUser });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  signOut: function() {
    IWillCookThat.currentUser.signOut({});
  },

  addLogInForm: function() {
    var logInForm = new IWillCookThat.Views.SignIn({
      model: IWillCookThat.currentUser
    });
    this.addSubview("div.insert-modal",logInForm);
    this.render();
  }
});
