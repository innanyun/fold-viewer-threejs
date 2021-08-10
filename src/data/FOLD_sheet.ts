import { Sheet } from 'sheet/sheet';
import { VertexId, Vector2Coord, Vector3Coord } from 'sheet/types';
import { readFoldFile } from './FOLD_file_reader';
import { FOLD_data } from './FOLD_format';


export class FoldFileSheet implements Sheet {

  private _vertexLocations: Array<Vector2Coord>;
  private _vertexPositions: Array<Vector3Coord>;
  private _faceVertexIndices: Array<Array<VertexId>>;

  vertexLocations(): Array<Vector2Coord> { return this._vertexLocations; }
  vertexPositions(): Array<Vector3Coord> { return this._vertexPositions; }
  faceVertexIndices(): Array<Array<VertexId>> { return this._faceVertexIndices; }

  constructor(foldFileUrl: string) {
    const foldData = readFoldFile(foldFileUrl) as FOLD_data;

    this._vertexLocations = foldData.vertices_coords as Vector2Coord[];
    this._vertexPositions = this._vertexLocations.map(([u, v]) => [u, v, 0.0]);
    this._faceVertexIndices = foldData.faces_vertices as VertexId[][];
  }

}
