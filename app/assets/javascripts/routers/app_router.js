IWillCookThat.Routers.Router = Backbone.Router.extend({
  routes: {
    'user/activity': 'profileActivity',
    'user/saved': 'savedRecipes',
    'recipes/new':'new',
    'recipes/:id': 'show',
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.recipes = new IWillCookThat.Collections.Recipes();
    this.reviews = new IWillCookThat.Collections.Reviews();
    this.folders = new IWillCookThat.Collections.Folders();
    this.folderRecipes = new IWillCookThat.Collections.FolderRecipes();
    if (IWillCookThat.currentUser.isSignedIn()) {
      this.recipes.fetch();
      this.reviews.fetch();
      this.folders.fetch();
      this.folderRecipes.fetch();
    }
  },

  profileActivity: function() {
    //reroute if not logged in
    var profileView = new IWillCookThat.Views.UserProfile({
      recipes: this.recipes,
      reviews: this.reviews,
      folders: this.folders,
    });
    profileView.addActivityView();
    this._swapView(profileView);
  },

  savedRecipes: function() {
    //reroute if not logged in
    var profileView = new IWillCookThat.Views.UserProfile({
      folders: this.folders,
      folderRecipes: this.folderRecipes
    });
    profileView.addSavedRecipesView();
    this._swapView(profileView);
  },

  new: function() {
    //reroute if not logged in
    var recipe = new IWillCookThat.Models.Recipe();
    var formView = new IWillCookThat.Views.RecipeForm({
      model: recipe,
      collection: this.recipes
    });
    this._swapView(formView);
  },

  show: function(id) {
    //don't use getorFetch on this.recipes because this.recipes is to hold
    //only recipes authored by the current user, not any recipe being shown.
    var recipe = new IWillCookThat.Models.Recipe({ id: id });
    recipe.fetch();
    var recipeView = new IWillCookThat.Views.RecipeShow({
      model: recipe,
      folders: this.folders,
      folderRecipes: this.folderRecipes
    });
    this._swapView(recipeView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }

});
