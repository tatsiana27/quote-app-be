#!/bin/bash

HOME_DIR="./data"
BACKUP_DIR="./data/backup"
USERS_DATA="${HOME_DIR}/users.db"

help()
{
   # Display Help
   echo "Please choose one of the next commands:"
   echo
   echo "a     Add user"
   echo "b     Create backup file"
   echo "l     Print all exiting users"
   echo "li    Print all existing users in opposite order"
   echo "r     Restore users.db file from backup"
   echo
}
help
read command

checkFile() {
  if [ ! -f "$USERS_DATA" ]; then
    mkdir -p ${HOME_DIR}
    touch ${USERS_DATA}
    echo "Create new users.db file"
  fi
}

case $command in
     a)
          checkFile
          read -p "Enter an username: " username

          if [[ $username =~ ^[A-Za-z]+$ ]]; then
            read -p "Enter a role: " role

            if [[ $role =~ ^[A-Za-z]+$ ]]; then
              lines=$(wc -l < ${USERS_DATA})
              currentCount=$((lines + 1))
              echo  "${currentCount}. ${username}, ${role}" >> ${USERS_DATA}
              echo "User was successfully added"
            else
              echo "The role is not valid"
            fi
          else
            echo "The username is not valid"
          fi
          ;;
     l)
          checkFile
          cat ${USERS_DATA}
          ;;
     li)
          checkFile
          tac ${USERS_DATA}
          ;;
     b)
           checkFile
           cp ${USERS_DATA} ${BACKUP_DIR}/$(date +%Y.%m.%d.%H.%M)-users.db.backup
           echo "The copy of the users.db file was created"
          ;;
     r)
        LAST_BACKUP_FILE=$(find ${BACKUP_DIR}/*-users.db.backup | tail -n 1)

        if [ -f "$LAST_BACKUP_FILE" ]; then
          cat "$LAST_BACKUP_FILE" > "$USERS_DATA"
        else
          echo "No backup file found"
        fi
        ;;
     f)
          echo "Please enter username"
          read username
          checkFile

          if [[ $? == 0 ]]; then
             grep $username ${USERS_DATA}

             if [[ $? != 0 ]]; then
               echo "User does not exist!!!"
             fi
          fi

          ;;
     h)
          help
          ;;
     *)
          help
          ;;
esac





