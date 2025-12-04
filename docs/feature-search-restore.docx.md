# Feature Request: Search Term Restoring

## **December 3rd 2025**

# **OBJECTIVE**

To give users the ability to get search terms from before the redirect restored after user redirect on login

# **BACKGROUND** 

Current flow:

* User opens the app and types a search term.  
* When they try to run the search, they realize they must log in with Spotify.  
* After completing the authorization and redirect, the search term is lost.  
* User types the same query again.

Pain points:

* Frustration: user repeats the same action twice.  
* Broken flow: the app “forgets” what the user clearly showed interest in  
* Feels like a demo version, not a complete product

# **TECHNICAL DESIGN**

A component **SearchBar** should be updated. This component, on initialization, the **search** state should be set from **localStorage.getItem(‘search’)**, if there is no **‘search’** in local storage \- the initial value should fall back to an empty string (**“”**).

A function **handleChange** should be updated. The function should read the current input value from **e.target.value** and store it in a local variable **value.** This variable should then should be stored in the **search** state and be written to **localStorage** under the **‘search’** key

# **CAVEATS**

**LocalStorage availability**  
The app relies on localStorage. If the browser blocks storage, the search value cannot be persisted, and the initial value will always fall back to an empty string.

**Search lifetime tied to session**  
The saved search term is cleared when the access token expires or when the user explicitly logs out. Coming back after the session has expired will not restore the previous search.

**Search restoration does not trigger API calls automatically**  
Restoring the search value after login only updates the input field. The user still needs to explicitly run a search to trigger API requests.