git filter-branch --commit-filter 'if [ "$GIT_AUTHOR_NAME" = "vagrant" ];
  then export GIT_AUTHOR_NAME="Raphael Cruzeiro"; export GIT_AUTHOR_EMAIL=raphaelcruzeiro@raphaelcruzeiro.com;
  fi; git commit-tree "$@"'
