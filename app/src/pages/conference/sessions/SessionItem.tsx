import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../../context/AuthProvider";
import { SessionInfo_sessionById } from "../../../graphql-types";

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($sessionId: ID!) {
    toggleFavoriteSession(sessionId: $sessionId) {
      id
      favorites {
        id
      }
    }
  }
`;

export function SessionItem({ session }: {session: SessionInfo_sessionById & {favorite: boolean}}) {
  const { isAuthenticated } = useAuthContext();
  const [toggle] = useMutation(TOGGLE_FAVORITE, {
    variables: { sessionId: session.id },
  });

  const markFavorite = async () => {
    await toggle();
  };

  const { id, title, day, room, level, favorite, speakers = [] } = session;
  return (
    <div key={id} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">
          <h5>{`Day: ${day}`}</h5>
          {room ? <h5>{`Room Number: ${room}`}</h5> : null}
          {level ? <h5>{`Level: ${level}`}</h5> : null}
        </div>
        <div className="panel-footer">
          {isAuthenticated && (
            <span style={{ padding: 2 }}>
              <button
                type="button"
                className="btn btn-default btn-lg"
                onClick={markFavorite}
              >
                <i
                  className={`fa ${favorite ? "fa-star" : "fa-star-o"}`}
                  aria-hidden="true"
                  style={{
                    color: favorite ? "gold" : undefined,
                  }}
                ></i>{" "}
                Favorite
              </button>
            </span>
          )}
          {speakers && speakers.map((speaker) => {
            if(!speaker) return null;
            return(
              <span key={speaker.id} style={{ padding: 2 }}>
                <Link
                  className="btn btn-default btn-lg"
                  to={`/conference/speakers/${speaker.id}`}
                >
                  View {speaker.name}'s Profile
                </Link>
              </span>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
