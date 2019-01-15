// This plugin is used to warn or break the build when a chunk with 'chunkName'
// contains any of the paths in warning or error.
// This is used to make it easier to move for example reducer-functionality to
// separate chunks, and break the build if this regresses.

class ValidateChunksPlugin {
  constructor(options = {}) {
    this.options = options;
    this.warning = options.warning || [];
    this.error = options.error || [];
    this.chunkName = options.chunkName;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("ValidateChunksPlugin", this.onEmit.bind(this));
  }

  onEmit(compilation, callback) {
    if (compilation.chunks) {
      compilation.chunks.forEach((chunk) => this.checkChunk(chunk));
    }

    callback();
  }

  checkChunk(chunk) {
    if (chunk.modulesIterable) {
      if (this.chunkName === chunk.name) {
        for(const module of chunk.modulesIterable){
          this.checkModule(module, chunk)
        }
      }
    }
  }

  checkModule(module, chunk) {
    if (module.buildInfo && module.buildInfo.fileDependencies) {
      module.buildInfo.fileDependencies.forEach((filepath) =>
        this.checkFile(filepath, chunk)
      );
    }
  }

  checkFile(filepath, chunk) {
    let warningPath = this.warning.find((blacklistedPath) =>
      filepath.includes(blacklistedPath)
    );
    if (warningPath) {
      console.log(
        `\n\n>>>>>>>>>> WARNING: Chunk '${
          chunk.name
        }' contains blacklisted file '${warningPath}' <<<<<<<<<<\n\n`
      );
    }
    let errorPath = this.error.find((blacklistedPath) =>
      filepath.includes(blacklistedPath)
    );
    if (errorPath) {
      throw new Error(
        `Chunk '${chunk.name}' contains blacklisted file '${errorPath}'`
      );
    }
  }
}

module.exports = ValidateChunksPlugin;
