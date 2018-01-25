Rails.application.routes.draw do
  devise_for :users
  root 'prototypes#index'
  
  resources :users, only: [:show, :edit, :update]
  resources :prototypes, only: [:index, :new, :create, :show, :destroy, :delete, :edit, :update] do
    resources :comments, only: [:create, :destroy, :edit, :update]
  end
  
  post   '/like/:prototype_id' => 'likes#create',   as: 'create'
  delete '/like/:prototype_id' => 'likes#destroy', as: 'destroy'
end
